/* global process */

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mysql from "mysql2/promise";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

/* --- Load environment variables from .env file --- */
dotenv.config();

/* --- Create Express application --- */
const app = express();
const PORT = process.env.PORT || 3000;

/* --- Allowed frontend origins for local and deployed use --- */
const allowedOrigins = [
  "https://sweet-box-backend.onrender.com",
  process.env.FRONTEND_URL,
].filter(Boolean);

const isAllowedOrigin = (origin) => {
  if (!origin) return true;

  return (
    origin.startsWith("http://localhost:") ||
    origin.startsWith("http://127.0.0.1:") ||
    allowedOrigins.includes(origin) ||
    origin.endsWith(".netlify.app") ||
    origin.endsWith(".vercel.app")
  );
};

/* --- Security middleware --- */
app.use(helmet());

app.use(
  cors({
    origin(origin, callback) {
      if (isAllowedOrigin(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS policy blocked this request."));
      }
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  }),
);

app.use(express.json({ limit: "1mb" }));

/* --- Rate limiter used to reduce order spam attempts --- */
const orderLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: {
    message: "Too many order attempts. Please try again later.",
  },
});

/* --- MySQL connection pool configuration --- */
const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

/* --- Basic email validation pattern --- */
const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

/* --- Basic phone validation pattern --- */
const isValidPhone = (phone) => /^[0-9+\s]{7,14}$/.test(phone);

/* --- Full name validation: allows letters, spaces, apostrophes, and hyphens --- */
const isValidName = (name) => /^[A-Za-zÀ-ÿ\s'-]{2,60}$/.test(name.trim());

/* --- Date validation: requires YYYY-MM-DD format --- */
const isValidDate = (date) => /^\d{4}-\d{2}-\d{2}$/.test(date);

/* --- Time validation: requires HH:MM format --- */
const isValidTime = (time) => /^([01]\d|2[0-3]):[0-5]\d$/.test(time);

/* --- Validates incoming order data before database insertion --- */
const validateOrderData = (orderData) => {
  const {
    name,
    email,
    phone,
    delivery,
    payment,
    preorderDate,
    preorderTime,
    savedBoxes = [],
    customMixes = [],
    total,
  } = orderData;

  if (!name || !email || !phone || !delivery || !payment) {
    return "Missing required customer, delivery, or payment details.";
  }

  if (!isValidName(name)) {
    return "Invalid full name format.";
  }

  if (!isValidEmail(email)) {
    return "Invalid email address format.";
  }

  if (!isValidPhone(phone)) {
    return "Invalid phone number format.";
  }

  if (!["standard", "collection"].includes(delivery)) {
    return "Invalid delivery option.";
  }

  if (!["card", "cash"].includes(payment)) {
    return "Invalid payment option.";
  }

  if (preorderDate && !isValidDate(preorderDate)) {
    return "Invalid preorder date format.";
  }

  if (preorderTime && !isValidTime(preorderTime)) {
    return "Invalid preorder time format.";
  }

  if (!Array.isArray(savedBoxes) || !Array.isArray(customMixes)) {
    return "Invalid basket format.";
  }

  if (savedBoxes.length === 0 && customMixes.length === 0) {
    return "Basket cannot be empty.";
  }

  if (typeof total !== "number" || total <= 0) {
    return "Invalid order total.";
  }

  return null;
};

/* --- Health check route used to confirm that the backend is running --- */
app.get("/", (req, res) => {
  res.send("Sweet Box backend is running");
});

/* --- Saves a complete customer order into the database --- */
app.post("/api/orders", orderLimiter, async (req, res) => {
  const validationError = validateOrderData(req.body);

  if (validationError) {
    return res.status(400).json({
      message: validationError,
    });
  }

  let connection;

  try {
    connection = await db.getConnection();

    const {
      name,
      email,
      phone,
      delivery,
      city,
      postcode,
      address,
      payment,
      preorderDate,
      preorderTime,
      savedBoxes = [],
      customMixes = [],
      boxesSubtotal = 0,
      mixesSubtotal = 0,
      deliveryCost = 0,
      total,
    } = req.body;

    await connection.beginTransaction();

    const [orderResult] = await connection.execute(
      `INSERT INTO orders (
        customer_name,
        email,
        phone,
        delivery_method,
        city,
        postcode,
        address,
        payment_method,
        preorder_date,
        preorder_time,
        boxes_subtotal,
        mixes_subtotal,
        delivery_cost,
        total_price
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        email,
        phone,
        delivery,
        city || null,
        postcode || null,
        address || null,
        payment,
        preorderDate || null,
        preorderTime || null,
        boxesSubtotal,
        mixesSubtotal,
        deliveryCost,
        total,
      ],
    );

    const orderId = orderResult.insertId;

    for (const box of savedBoxes) {
      const [boxResult] = await connection.execute(
        `INSERT INTO order_boxes (
          order_id,
          box_size,
          box_price
        )
        VALUES (?, ?, ?)`,
        [orderId, box.boxSize, box.price],
      );

      const boxId = boxResult.insertId;

      for (const [flavourName, quantity] of Object.entries(box.groupedItems)) {
        await connection.execute(
          `INSERT INTO order_box_items (
            box_id,
            flavour_name,
            quantity
          )
          VALUES (?, ?, ?)`,
          [boxId, flavourName, quantity],
        );
      }
    }

    for (const mix of customMixes) {
      await connection.execute(
        `INSERT INTO order_custom_mixes (
          order_id,
          mix_name,
          quantity,
          price_each,
          total_price
        )
        VALUES (?, ?, ?, ?, ?)`,
        [orderId, mix.name, mix.quantity, mix.price, mix.price * mix.quantity],
      );
    }

    await connection.commit();

    return res.status(201).json({
      message: "Order saved successfully",
      orderId,
    });
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }

    console.error("Order save error:", error);

    return res.status(500).json({
      message: "Failed to save order. Please try again later.",
    });
  } finally {
    if (connection) {
      connection.release();
    }
  }
});

/* --- Start backend server --- */
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

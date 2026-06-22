# Sweet Box

## Overview

Sweet Box is a full-stack web application.

The application was designed for a macaron bakery and provides an interactive online ordering experience that allows customers to create personalised macaron boxes, select flavours, choose delivery options and place customised orders through a user-friendly interface.

Unlike traditional bakery ordering systems that offer limited product personalisation, Sweet Box enables customers to actively participate in product creation by building customised macaron boxes and creating unique flavour combinations.

---

## Live Deployment

### Frontend

https://sweet-box.netlify.app/

### Backend API

https://sweet-box-backend.onrender.com

---

## Features

### Customer Features

- Browse available macaron flavours
- Select different box sizes
- Create customised macaron boxes
- Build unique flavour combinations
- Dynamic price calculation
- Choose delivery or collection
- Select a payment method
- Checkout form validation
- Order confirmation page
- Responsive design for desktop and mobile devices

### Validation Features

The application implements both frontend and backend validation to improve data quality and security.

Examples include:

- Required field validation
- Email format validation
- Empty basket prevention
- Name field validation
- Delivery option validation
- Payment method validation
- Date and time validation

---

## Technology Stack

### Frontend

- React
- Vite
- JavaScript
- CSS

### Backend

- Node.js
- Express.js

### Database

- MySQL (Railway)

### Security & Configuration

- Helmet
- CORS
- Express Rate Limit
- dotenv

### Deployment

- Netlify (Frontend)
- Render (Backend)
- Railway (Database)

---

## Project Structure

```text
sweet-box/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── routes/
│   ├── database/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## Database Structure

The application stores customer orders using a relational MySQL database.

Main tables:

- orders
- order_boxes
- order_custom_mixes
- order_box_items

These tables work together to store customer information, order details, selected box configurations and customised flavour combinations.

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/Viorica123333333333/sweet-box.git
```

---

## Frontend Setup

Navigate to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Frontend will be available at:

```text
http://localhost:5173
```

---

## Backend Setup

Open a second terminal.

Navigate to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Start the backend server:

```bash
npm start
```

Backend will be available at:

```text
http://localhost:3000
```

---

## Environment Variables

The backend uses **dotenv** to manage environment variables and protect sensitive configuration data.

Create a `.env` file inside the backend directory:

```env
DB_HOST=your_database_host
DB_PORT=your_database_port
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
```

The application loads these values using:

```javascript
import dotenv from "dotenv";

dotenv.config();
```

This approach keeps database credentials separate from the source code and improves security when deploying the application.

**Important:** Never commit real credentials or passwords to a public GitHub repository.

---

## Security Measures

The backend includes several security mechanisms:

### Helmet

Adds HTTP security headers to help protect against common web vulnerabilities.

### CORS

Controls which domains are permitted to communicate with the backend API.

### Rate Limiting

Restricts excessive requests from a single client to reduce abuse and improve application stability.

### Server-Side Validation

All critical order information is validated on the server before being processed and stored in the database.

---

## Limitations

This project was developed as an academic prototype.

The current version:

- Does not process real payments
- Does not send automated emails
- Does not include an administrative dashboard
- Focuses specifically on macaron customisation

---

## Future Improvements

Potential future enhancements include:

- Stripe or PayPal payment integration
- Automated email notifications
- Administrative management dashboard
- Inventory management functionality
- Order status tracking
- User accounts and authentication
- Expanded product catalogue

---

## Academic Context

This project was developed for the **Computing Project** module and demonstrates:

- Frontend development using React
- REST API integration
- Backend development using Node.js and Express.js
- Relational database design using MySQL
- Client-side and server-side validation
- Deployment of a full-stack web application
- Application of web security practices

---

## Screenshots

Screenshots of the application can be added here to demonstrate key functionality such as:

- Home Page
- Choose Box Page
- Mix Flavours Page
- Checkout Page
- Order Confirmation Page

---

GitHub:
https://github.com/Viorica123333333333

Project Repository:
https://github.com/Viorica123333333333/sweet-box

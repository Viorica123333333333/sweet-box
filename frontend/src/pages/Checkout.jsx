import { useState } from "react";

import strawberry from "../assets/images/strawberry.jpg";
import chocolate from "../assets/images/chocolate.jpg";
import pistachio from "../assets/images/pistachio.jpg";
import caramelvanilla from "../assets/images/caramelvanilla.jpg";
import vanilla from "../assets/images/vanila.jpg";
import blueberry from "../assets/images/bluberry.jpg";
import almond from "../assets/images/almond.jpg";
import kiwi from "../assets/images/kiwi.jpg";
import mango from "../assets/images/mango.jpg";
import lemon from "../assets/images/lemon.jpg";
import caramel from "../assets/images/caramel.jpg";
import coffee from "../assets/images/coffe.jpg";
import peanut from "../assets/images/peanut.jpg";
import chocolatefarm from "../assets/images/chocolatefarm.jpg";
import mintplombir from "../assets/images/mintplombir.jpg";

/* --- Product image map used in checkout order summary --- */
const products = {
  Strawberry: { image: strawberry },
  Chocolate: { image: chocolate },
  Pistachio: { image: pistachio },
  "Caramel Vanilla": { image: caramelvanilla },
  Vanilla: { image: vanilla },
  Blueberry: { image: blueberry },
  Almond: { image: almond },
  Kiwi: { image: kiwi },
  Mango: { image: mango },
  Lemon: { image: lemon },
  Caramel: { image: caramel },
  Coffee: { image: coffee },
  Peanut: { image: peanut },
  "Chocolate Farm": { image: chocolatefarm },
  "Mint Plombir": { image: mintplombir },
};

function Checkout({
  savedBoxes = [],
  setSavedBoxes,
  customMixes = [],
  setCustomMixes,
}) {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [preorderDate, setPreorderDate] = useState("");
  const [preorderTime, setPreorderTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* --- Minimum pre-order date is tomorrow to avoid same-day scheduling --- */
  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  const tomorrowDate = getTomorrowDate();

  /* --- Input helper used to keep name fields alphabetic --- */
  const onlyLetters = (event) => {
    event.target.value = event.target.value.replace(/[^a-zA-ZÀ-ÿ\s'-]/g, "");
  };

  /* --- Input helper used to keep phone fields numeric with + and spaces --- */
  const onlyPhone = (event) => {
    event.target.value = event.target.value.replace(/[^0-9+\s]/g, "");
  };

  /* --- Price calculations used in the order summary --- */
  const boxesSubtotal = savedBoxes.reduce((sum, box) => sum + box.price, 0);

  const mixesSubtotal = customMixes.reduce(
    (sum, mix) => sum + mix.price * mix.quantity,
    0,
  );

  const deliveryCost =
    deliveryMethod === "standard" &&
    (savedBoxes.length > 0 || customMixes.length > 0)
      ? 30
      : 0;

  const total = boxesSubtotal + mixesSubtotal + deliveryCost;

  /* --- Removes a complete saved macaron box from checkout --- */
  const removeBox = (id) => {
    setSavedBoxes(savedBoxes.filter((box) => box.id !== id));
  };

  /* --- Removes a custom flavour mix from checkout --- */
  const removeMix = (indexToRemove) => {
    setCustomMixes(customMixes.filter((_, index) => index !== indexToRemove));
  };

  /* --- Converts internal system values into user-friendly labels --- */
  const getDeliveryLabel = (value) => {
    return value === "standard" ? "Standard Delivery" : "Click & Collect";
  };

  const getPaymentLabel = (value) => {
    return value === "card" ? "Card Payment" : "Cash on Collection";
  };

  /* --- Sends the order to the backend API and displays confirmation result --- */
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (savedBoxes.length === 0 && customMixes.length === 0) {
      alert(
        "Your basket is empty. Please add a box or a custom mix before placing an order.",
      );
      return;
    }

    if ((preorderDate && !preorderTime) || (!preorderDate && preorderTime)) {
      alert(
        "Please select both pre-order date and preferred time, or leave both empty.",
      );
      return;
    }

    const form = event.currentTarget;

    const data = {
      name: form.fullName.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),

      /* --- Controlled internal values sent to backend validation --- */
      delivery: deliveryMethod,
      payment: paymentMethod,

      /* --- Safe prototype values: no real address is collected --- */
      city: deliveryMethod === "standard" ? "System prototype" : "",
      postcode: deliveryMethod === "standard" ? "System prototype" : "",
      address: deliveryMethod === "standard" ? "System prototype" : "",

      preorderDate,
      preorderTime,
      savedBoxes,
      customMixes,
      boxesSubtotal,
      mixesSubtotal,
      deliveryCost,
      total,
    };

    try {
      setIsSubmitting(true);

      const response = await fetch(
        "https://sweet-box-backend.onrender.com/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Order failed");
      }

      setOrderData({
        ...data,
        orderId: result.orderId,
      });

      setOrderPlaced(true);
      setSavedBoxes([]);
      setCustomMixes([]);
    } catch (error) {
      console.error("Order error:", error);
      alert(error.message || "Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-form-card">
          <h1>Checkout</h1>

          {!orderPlaced && (
            <>
              <p>Please complete your order details below.</p>

              <p className="small-note">
                System prototype notice: real card details and real address
                details are disabled. The order flow is still processed for
                demonstration purposes.
              </p>
            </>
          )}

          {!orderPlaced ? (
            <form className="checkout-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  onInput={onlyLetters}
                  required
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  required
                />
              </div>

              <div className="form-row">
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  maxLength="14"
                  onInput={onlyPhone}
                  required
                />
              </div>

              <div className="checkout-section">
                <h3>Delivery Method</h3>

                <label>
                  <input
                    type="radio"
                    name="delivery"
                    value="standard"
                    checked={deliveryMethod === "standard"}
                    onChange={(event) => setDeliveryMethod(event.target.value)}
                    required
                  />
                  Standard Delivery
                </label>

                <label>
                  <input
                    type="radio"
                    name="delivery"
                    value="collection"
                    checked={deliveryMethod === "collection"}
                    onChange={(event) => setDeliveryMethod(event.target.value)}
                  />
                  Click & Collect
                </label>
              </div>

              {deliveryMethod === "standard" && (
                <div className="delivery-details">
                  <p className="small-note">
                    Address fields are shown only as an interface design
                    example. No real address data is collected or stored.
                  </p>

                  <div className="form-row">
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      disabled
                    />

                    <input
                      type="text"
                      name="postcode"
                      placeholder="Postcode"
                      disabled
                    />
                  </div>

                  <input
                    type="text"
                    name="address"
                    placeholder="Address line"
                    disabled
                  />
                </div>
              )}

              <div className="checkout-section">
                <h3>Pre-order Details</h3>

                <p className="small-note">
                  Optional. Choose a future date and preferred time if you want
                  to schedule your order.
                </p>

                <div className="form-row">
                  <input
                    type="date"
                    value={preorderDate}
                    min={tomorrowDate}
                    onChange={(event) => setPreorderDate(event.target.value)}
                  />

                  <select
                    value={preorderTime}
                    onChange={(event) => setPreorderTime(event.target.value)}
                  >
                    <option value="">Select time</option>
                    <option value="09:00">09:00 - 11:00</option>
                    <option value="11:00">11:00 - 13:00</option>
                    <option value="13:00">13:00 - 15:00</option>
                    <option value="15:00">15:00 - 17:00</option>
                  </select>
                </div>
              </div>

              <div className="checkout-section">
                <h3>Payment Method</h3>

                <label>
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={(event) => setPaymentMethod(event.target.value)}
                    required
                  />
                  Card Payment
                </label>

                <label>
                  <input
                    type="radio"
                    name="payment"
                    value="cash"
                    checked={paymentMethod === "cash"}
                    onChange={(event) => setPaymentMethod(event.target.value)}
                  />
                  Cash on Collection
                </label>

                {paymentMethod === "card" && (
                  <div className="card-details">
                    <p className="small-note">
                      Card fields are shown only as an interface design example.
                      No real card data is collected or stored.
                    </p>

                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="Card payment"
                      disabled
                    />

                    <div className="form-row">
                      <input
                        type="text"
                        name="expiry"
                        placeholder="MM/YY"
                        disabled
                      />

                      <input
                        type="text"
                        name="cvv"
                        placeholder="CVV"
                        disabled
                      />
                    </div>

                    <input
                      type="text"
                      name="cardHolder"
                      placeholder="Card holder name"
                      disabled
                    />
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="place-order-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Place Order"}
              </button>
            </form>
          ) : (
            <div className="order-success">
              <h2>Order Confirmed!</h2>

              <p>
                <strong>Order Number:</strong> {orderData.orderId}
              </p>

              <p>
                <strong>Name:</strong> {orderData.name}
              </p>

              <p>
                <strong>Email:</strong> {orderData.email}
              </p>

              <p>
                <strong>Phone:</strong> {orderData.phone}
              </p>

              <p>
                <strong>Delivery Method:</strong>{" "}
                {getDeliveryLabel(orderData.delivery)}
              </p>

              {orderData.preorderDate && orderData.preorderTime && (
                <>
                  <p>
                    <strong>Pre-order Date:</strong> {orderData.preorderDate}
                  </p>

                  <p>
                    <strong>Preferred Time:</strong> {orderData.preorderTime}
                  </p>
                </>
              )}

              {orderData.delivery === "standard" && (
                <p>
                  <strong>Address:</strong> Not collected for system prototype.
                </p>
              )}

              <p>
                <strong>Payment:</strong> {getPaymentLabel(orderData.payment)}
              </p>

              <h3>Your Order</h3>

              {orderData.savedBoxes.map((box) => (
                <div key={box.id} className="confirmed-order-block">
                  <p>
                    <strong>Box of {box.boxSize}</strong> —{" "}
                    {box.price + "\u00A0MDL"}
                  </p>

                  {Object.entries(box.groupedItems).map(([name, quantity]) => (
                    <p key={name}>
                      {name} x{quantity}
                    </p>
                  ))}
                </div>
              ))}

              {orderData.customMixes.map((mix, index) => (
                <p key={index}>
                  Custom Mix: {mix.name} x{mix.quantity} —{" "}
                  {mix.price * mix.quantity + "\u00A0MDL"}
                </p>
              ))}

              {orderData.deliveryCost > 0 && (
                <p>
                  <strong>Delivery:</strong>{" "}
                  {orderData.deliveryCost + "\u00A0MDL"}
                </p>
              )}

              <h3>Total: {orderData.total + "\u00A0MDL"}</h3>

              <p>Thank you for testing Sweet Box!</p>
            </div>
          )}
        </div>

        {!orderPlaced && (
          <div className="checkout-summary-card">
            <h2>Order Summary</h2>

            {savedBoxes.length === 0 && customMixes.length === 0 ? (
              <p>Your basket is empty.</p>
            ) : (
              <>
                {savedBoxes.map((box) => (
                  <div key={box.id} className="saved-box-summary">
                    <div className="summary-top-row">
                      <h3>Box of {box.boxSize}</h3>

                      <button
                        type="button"
                        className="remove-item-btn"
                        onClick={() => removeBox(box.id)}
                      >
                        Remove
                      </button>
                    </div>

                    {Object.entries(box.groupedItems).map(
                      ([name, quantity]) => (
                        <div key={name} className="checkout-item">
                          <img
                            src={products[name]?.image}
                            alt={name}
                            className="checkout-thumb"
                          />

                          <div className="checkout-item-info">
                            <span>{name}</span>
                            <span>x{quantity}</span>
                          </div>
                        </div>
                      ),
                    )}

                    <div className="summary-item">
                      <span>Box Total</span>
                      <span>{box.price + "\u00A0MDL"}</span>
                    </div>
                  </div>
                ))}

                {customMixes.map((mix, index) => (
                  <div key={index} className="saved-box-summary">
                    <div className="summary-top-row">
                      <h3>Custom Mix</h3>

                      <button
                        type="button"
                        className="remove-item-btn"
                        onClick={() => removeMix(index)}
                      >
                        Remove
                      </button>
                    </div>

                    <div className="checkout-item">
                      <div className="checkout-thumb mix-thumb">Mix</div>

                      <div className="checkout-item-info">
                        <span>{mix.name}</span>
                        <span>x{mix.quantity}</span>
                      </div>
                    </div>

                    <div className="summary-item">
                      <span>Mix Total</span>
                      <span>{mix.price * mix.quantity + "\u00A0MDL"}</span>
                    </div>
                  </div>
                ))}
              </>
            )}

            <div className="summary-item">
              <span>Boxes Subtotal</span>
              <span>{boxesSubtotal + "\u00A0MDL"}</span>
            </div>

            <div className="summary-item">
              <span>Custom Mixes</span>
              <span>{mixesSubtotal + "\u00A0MDL"}</span>
            </div>

            {deliveryMethod === "standard" && (
              <div className="summary-item">
                <span>Delivery</span>
                <span>{deliveryCost + "\u00A0MDL"}</span>
              </div>
            )}

            <div className="summary-total">
              <span>Total</span>
              <span>{total + "\u00A0MDL"}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Checkout;

import contactImg from "../assets/images/contact.jpg";

/* --- Restricts input to letters and spaces only (used for name field) --- */
const allowLettersOnly = (event) => {
  event.target.value = event.target.value.replace(/[^a-zA-Z\s]/g, "");
};

/* --- Static contact information displayed on the page --- */
const contactDetails = {
  email: "hello@sweetbox.com",
  phone: "+44 1234 567890",
  address:
    "Sweet Box Bakery, Sweet Street 21, Chisinau, Republic of Moldova, DM-21BX",
};

function Contact() {
  return (
    <div className="contact-page">
      <div className="contact-container">
        {/* --- Contact information and form section --- */}
        <div className="contact-info-card">
          <h1>Contact Us</h1>

          <p>
            Your questions matter. Use this section to contact us about your
            macaron box, flavour choices, or a future order, and receive a clear
            and prompt response.
          </p>

          {/* --- Business contact details --- */}
          <div className="contact-details">
            <p>
              <strong>Email:</strong> {contactDetails.email}
            </p>

            <p>
              <strong>Phone:</strong> {contactDetails.phone}
            </p>

            <p>
              <strong>Location:</strong> {contactDetails.address}
            </p>
          </div>

          {/* --- Contact form (frontend only) --- */}
          <form className="contact-form">
            <input
              type="text"
              placeholder="Your Name"
              onInput={allowLettersOnly}
              required
            />

            <input type="email" placeholder="Your Email" required />

            <textarea placeholder="Your Message" rows="5" required></textarea>

            <button type="submit">Send Message</button>
          </form>
        </div>

        {/* --- Visual support image --- */}
        <div className="contact-image-wrap">
          <img
            src={contactImg}
            alt="Sweet Box contact illustration"
            className="contact-image"
          />
        </div>
      </div>
    </div>
  );
}

export default Contact;

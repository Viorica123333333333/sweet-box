import contactImg from "../assets/images/contact.jpg"; /* --- Unsplash(2021)	Free to use under the Unsplash License, Available at: https://unsplash.com/photos/yellow-round-fruit-on-pink-plastic-container-Nrjt3hAAdNc(Accessed, 2026) --- */

/* --- Input validation helper allowing only alphabetic characters --- */
const allowLettersOnly = (event) => {
  event.target.value = event.target.value.replace(/[^a-zA-ZÀ-ÿ\s'-]/g, "");
};
/* --- Prototype contact information displayed on the contact page --- */
const contactDetails = {
  email: "hello@sweetbox.com",
  phone: "+123456789089",
  address:
    "Sweet Box Bakery, Sweet Street 21, Chisinau, Republic of Moldova, DM-21BX",
};

function Contact() {
  return (
    <main className="contact-page redesigned-contact-page">
      <section className="contact-hero-layout">
        <div className="contact-content-card">
          <h1>Contact Sweet Box</h1>

          <p className="contact-intro">
            Contact us about macaron boxes, flavour combinations, pre-order
            details, or general Sweet Box enquiries.
          </p>

          {/* --- Displays bakery contact details --- */}
          <div className="contact-details-list">
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

          <form className="contact-form redesigned-contact-form">
            <input
              type="text"
              placeholder="Your Name"
              onInput={allowLettersOnly}
              required
            />

            <input type="email" placeholder="Your Email" required />

            <textarea placeholder="Your Message" rows="5" required></textarea>

            <button type="submit">Send Message →</button>
          </form>
        </div>
        {/* --- Decorative product image used to enhance visual presentation --- */}
        <div className="contact-visual-card">
          <img
            src={contactImg}
            alt="Sweet Box contact and macaron presentation"
          />
        </div>
      </section>
    </main>
  );
}

export default Contact;

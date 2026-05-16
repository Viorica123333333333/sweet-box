import { useNavigate } from "react-router-dom";

import bg from "../assets/images/background.jpg";
import chooseImg from "../assets/images/chose.jpg";
import mixImg from "../assets/images/mixflovers.jpg";
import strawberryImg from "../assets/images/strawberry.jpg";
import pistachioImg from "../assets/images/pistachio.jpg";
import chocolateImg from "../assets/images/chocolate.jpg";

/* --- Home page  layout --- */
function Home() {
  const navigate = useNavigate();

  return (
    <main
      className="home-page full-bg"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="home-overlay"></div>

      <section className="home-hero-section">
        <div className="hero-content">
          <p className="hero-eyebrow">Handcrafted macarons • Custom boxes</p>

          <h1>Build Your Sweet Box</h1>

          <p className="hero-description">
            Create your perfect macaron experience with personalised boxes,
            custom flavour mixes, and pre-order options.
          </p>

          <div className="hero-actions">
            <button type="button" onClick={() => navigate("/choose")}>
              Start Customising
            </button>

            <button type="button" onClick={() => navigate("/mix")}>
              Mix Flavours
            </button>
          </div>
        </div>
      </section>

      <section className="featured-section">
        <h2>Featured Macarons</h2>

        <div className="featured-grid">
          <article className="featured-card">
            <img src={strawberryImg} alt="Strawberry macarons" />
            <h3>Box of 6</h3>
            <p>120 MDL</p>
          </article>

          <article className="featured-card">
            <img src={pistachioImg} alt="Pistachio macarons" />
            <h3>Box of 12</h3>
            <p>220 MDL</p>
          </article>

          <article className="featured-card">
            <img src={chocolateImg} alt="Chocolate macarons" />
            <h3>Box of 24</h3>
            <p>400 MDL</p>
          </article>
        </div>
      </section>

      <section className="home-promotion-section">
        <div className="promotion-text">
          <p className="hero-eyebrow">Pre-order available</p>

          <h2>Plan your macaron box in advance</h2>

          <p>
            Sweet Box allows customers to choose a standard macaron box, create
            a custom flavour mix, and schedule an order for a future date during
            checkout.
          </p>
        </div>

        <div className="promotion-cards">
          <div className="quick-card" onClick={() => navigate("/choose")}>
            <img src={chooseImg} alt="Choose a macaron box" />
            <span>Choose Box</span>
          </div>

          <div className="quick-card" onClick={() => navigate("/mix")}>
            <img src={mixImg} alt="Mix macaron flavours" />
            <span>Mix Flavours</span>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;

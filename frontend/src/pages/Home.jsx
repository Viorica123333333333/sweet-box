import { useNavigate } from "react-router-dom";

import bg from "../assets/images/background.jpg";
import chooseImg from "../assets/images/chose.jpg";
import mixImg from "../assets/images/mixflovers.jpg";
import aboutImg from "../assets/images/about.jpg";

import pistachioImg from "../assets/images/pistachio.jpg";
import strawberryImg from "../assets/images/strawberry.jpg";
import caramelVanillaImg from "../assets/images/caramelvanilla.jpg";
import blueberryImg from "../assets/images/bluberry.jpg";

/* --- Home page layout structured according to the final UI design plan --- */
function Home() {
  const navigate = useNavigate();

  return (
    <main
      className="home-page"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="home-overlay"></div>

      <section className="home-hero-section">
        <div className="hero-content">
          <p className="hero-eyebrow">Handcrafted macarons • Custom boxes</p>

          <h1>Build Your Sweet Box</h1>

          <p className="hero-description">
            Create personalised macaron collections with elegant flavours,
            custom boxes, and pre-order options.
          </p>

          <div className="hero-actions">
            <button type="button" onClick={() => navigate("/choose")}>
              Start Customising →
            </button>

            <button type="button" onClick={() => navigate("/mix")}>
              Explore Flavours
            </button>
          </div>
        </div>
      </section>

      <section className="featured-section">
        <div className="section-title-row">
          <h2>Featured Macarons</h2>

          <p className="preorder-note">Pre-order available 📅</p>
        </div>

        <div className="featured-grid">
          <article className="featured-card">
            <img src={pistachioImg} alt="Pistachio macarons" />
            <h3>Pistachio</h3>
            <p>35 MDL</p>
          </article>

          <article className="featured-card">
            <img src={strawberryImg} alt="Strawberry macarons" />
            <h3>Strawberry</h3>
            <p>35 MDL</p>
          </article>

          <article className="featured-card">
            <img src={caramelVanillaImg} alt="Caramel vanilla macarons" />
            <h3>Vanilla Caramel</h3>
            <p>35 MDL</p>
          </article>

          <article className="featured-card">
            <img src={blueberryImg} alt="Blueberry macarons" />
            <h3>Blueberry</h3>
            <p>35 MDL</p>
          </article>
        </div>
      </section>

      <section className="home-action-section">
        <article className="home-action-card choose-action">
          <div>
            <h2>Choose Your Box</h2>

            <p>
              Select the perfect box size and fill it with your favourite
              macarons.
            </p>

            <div className="box-size-preview">
              <span>6 pcs<br />120 MDL</span>
              <span>12 pcs<br />220 MDL</span>
              <span>24 pcs<br />400 MDL</span>
            </div>

            <button type="button" onClick={() => navigate("/choose")}>
              Choose Box →
            </button>
          </div>

          <img src={chooseImg} alt="Macaron box selection" />
        </article>

        <article className="home-action-card mix-action">
          <div>
            <h2>Mix Your Flavours</h2>

            <p>
              Create your own flavour combination and make the box uniquely
              yours.
            </p>

            <button type="button" onClick={() => navigate("/mix")}>
              Start Mixing →
            </button>
          </div>

          <img src={mixImg} alt="Macaron flavour mix" />
        </article>
      </section>

      <section className="home-about-section">
        <div className="about-text">
          <h2>About Sweet Box</h2>

          <p>
            At Sweet Box, every macaron box is designed to bring a small moment
            of sweetness. The prototype allows customers to select boxes, mix
            flavours, and complete a guided checkout journey.
          </p>

          <p>
            The system was designed for a small bakery context, with a soft
            visual style and an ordering flow focused on clarity and simplicity.
          </p>

          <button type="button" onClick={() => navigate("/about")}>
            Learn More About Us
          </button>
        </div>

        <img src={aboutImg} alt="Sweet Box bakery macarons" />
      </section>
    </main>
  );
}

export default Home;
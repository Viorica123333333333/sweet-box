import { useNavigate } from "react-router-dom";

import bg from "../assets/images/background.jpg";

import chooseImg from "../assets/images/chose.jpg";
import mixImg from "../assets/images/mixflovers.jpg";
import aboutImg from "../assets/images/about.jpg";

import pistachioImg from "../assets/images/pistachio.jpg";
import strawberryImg from "../assets/images/strawberry.jpg";
import caramelVanillaImg from "../assets/images/caramelvanilla.jpg";
import blueberryImg from "../assets/images/bluberry.jpg";

/* --- Refined homepage layout based on final visual structure --- */
function Home() {
  const navigate = useNavigate();

  return (
    <main className="home-page">
      <section
        className="home-hero-section"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="hero-content">
          <h1>Build Your Sweet Box</h1>

          <p className="hero-description">
            Create personalised macaron collections with elegant flavours,
            custom boxes, and pre-order options.
          </p>

          <div className="hero-actions">
            <button type="button" onClick={() => navigate("/choose")}>
              Start Customising
            </button>

            <button type="button" onClick={() => navigate("/mix")}>
              Explore Flavours
            </button>
          </div>
        </div>
      </section>

      <section className="featured-section">
        <div className="section-title-row">
          <div>
            <p className="section-subtitle">Sweet Box Collection</p>

            <h2>Our Products</h2>
          </div>

          <p className="preorder-note">
            Pre-order available for future dates
          </p>
        </div>

        <div className="featured-grid">
          <article className="featured-card informational-card">
            <img src={pistachioImg} alt="Pistachio macarons" />

            <div className="card-content">
              <h3>Pistachio</h3>
              <p>Elegant pistachio cream flavour.</p>
            </div>
          </article>

          <article className="featured-card informational-card">
            <img src={strawberryImg} alt="Strawberry macarons" />

            <div className="card-content">
              <h3>Strawberry</h3>
              <p>Fresh strawberry-inspired sweetness.</p>
            </div>
          </article>

          <article className="featured-card informational-card">
            <img
              src={caramelVanillaImg}
              alt="Caramel vanilla macarons"
            />

            <div className="card-content">
              <h3>Vanilla Caramel</h3>
              <p>Smooth caramel and vanilla blend.</p>
            </div>
          </article>

          <article className="featured-card informational-card">
            <img src={blueberryImg} alt="Blueberry macarons" />

            <div className="card-content">
              <h3>Blueberry</h3>
              <p>Soft fruity flavour with berry notes.</p>
            </div>
          </article>
        </div>
      </section>

      <section className="home-action-section">
        <article className="home-action-card choose-action">
          <div className="action-text">
            <p className="section-subtitle">Custom Box Selection</p>

            <h2>Choose Your Box</h2>

            <p>
              Select the preferred box size and personalise the flavour
              selection.
            </p>

            <div className="box-size-preview">
              <span>6 pcs • 120 MDL</span>
              <span>12 pcs • 220 MDL</span>
              <span>24 pcs • 400 MDL</span>
            </div>

            <button type="button" onClick={() => navigate("/choose")}>
              Choose Box
            </button>
          </div>

          <img src={chooseImg} alt="Choose macaron box" />
        </article>

        <article className="home-action-card mix-action">
          <div className="action-text">
            <p className="section-subtitle">Flavour Personalisation</p>

            <h2>Mix Your Flavours</h2>

            <p>
              Combine flavours and create personalised macaron combinations.
            </p>

            <button type="button" onClick={() => navigate("/mix")}>
              Mix Flavours
            </button>
          </div>

          <img src={mixImg} alt="Mix macaron flavours" />
        </article>
      </section>

      <section className="home-about-section">
        <div className="about-text">
          <p className="section-subtitle">About Sweet Box</p>

          <h2>Designed for a modern bakery experience</h2>

          <p>
            Sweet Box was designed as an interactive macaron customisation
            prototype focused on customer experience, visual simplicity,
            and guided ordering.
          </p>

          <p>
            The system supports flavour personalisation, custom box
            creation, pre-order scheduling, and a structured checkout
            workflow.
          </p>

          <button type="button" onClick={() => navigate("/about")}>
            Learn More
          </button>
        </div>

        <img src={aboutImg} alt="Sweet Box macarons" />
      </section>
    </main>
  );
}

export default Home;
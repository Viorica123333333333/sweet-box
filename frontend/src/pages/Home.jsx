import { useNavigate } from "react-router-dom";

import chooseImg from "../assets/images/chose.jpg";
import mixImg from "../assets/images/mixflovers.jpg";
import peanutImg from "../assets/images/peanut.jpg";
import pistachioImg from "../assets/images/pistachio.jpg";
import mintplombirImg from "../assets/images/mintplombir.jpg";
import kiwiImg from "../assets/images/kiwi.jpg";
import almondImg from "../assets/images/almond.jpg";

/* --- Home page organised according to the planned wireframe layout --- */
function Home() {
  const navigate = useNavigate();

  return (
    <main className="home-page">
      <div className="home-overlay"></div>

      <section className="home-hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Build Your Sweet Box</h1>

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
        <h2>New Flavours</h2>

        <div className="featured-grid">
          <article className="featured-card">
            <img src={peanutImg} alt="Peanut macarons" />
            <h3>Peanut</h3>
          </article>

          <article className="featured-card">
            <img src={pistachioImg} alt="Pistachio macarons" />
            <h3>Pistachio</h3>
          </article>

          <article className="featured-card">
            <img src={mintplombirImg} alt="Mintplombir macarons" />
            <h3>Mintplombir</h3>
          </article>
          <article className="featured-card">
            <img src={almondImg} alt="Almond macarons" />
            <h3>Mintplombir</h3>
          </article>
          <article className="featured-card">
            <img src={kiwiImg} alt="Kiwi macarons" />
            <h3>Mintplombir</h3>
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

import { useNavigate } from "react-router-dom";

import heroBg from "../assets/images/background.jpg";
import chooseImg from "../assets/images/chose.jpg";
import mixImg from "../assets/images/mixflovers.jpg";
import aboutImg from "../assets/images/about.jpg";

import kiwiImg from "../assets/images/kiwi.jpg";
import strawberryImg from "../assets/images/strawberry.jpg";
import chocolatefarmImg from "../assets/images/chocolatefarm.jpg";
import lemonImg from "../assets/images/lemon.jpg";

/* --- Homepage designed as a premium bakery landing page --- */
function Home() {
  const navigate = useNavigate();

  const products = [
    { name: "Kiwi", price: "35 MDL", image: kiwiImg },
    { name: "Strawberry", price: "35 MDL", image: strawberryImg },
    { name: "Chocolate Farm", price: "35 MDL", image: chocolatefarmImg },
    { name: "Lemon", price: "35 MDL", image: lemonImg },
  ];

  return (
    <main className="premium-home">
      {/* --- Hero section --- */}
      <section
        className="premium-hero"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="premium-hero-content">
          <h1>Build Your Sweet Box</h1>

          <p>
            Create personalised macaron collections with elegant flavours and
            premium packaging.
          </p>

          <div className="premium-hero-actions">
            <button type="button" onClick={() => navigate("/choose")}>
              Start Customising →
            </button>

            <button type="button" onClick={() => navigate("/mix")}>
              Explore Flavours
            </button>
          </div>
        </div>
      </section>

      {/* --- Featured products section --- */}
      <section className="premium-products-section">
        <div className="premium-section-header">
          <h2>Featured Macarons</h2>

          <span>Pre-order available ♡</span>
        </div>

        <div className="premium-products-grid">
          {products.map((product) => (
            <article key={product.name} className="premium-product-card">
              <img src={product.image} alt={`${product.name} macarons`} />

              <div className="premium-product-info">
                <div>
                  <h3>{product.name}</h3>
                  <p>{product.price}</p>
                </div>

                <button type="button" onClick={() => navigate("/choose")}>
                  🛒
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* --- Main customisation cards --- */}
      <section className="premium-action-grid">
        <article className="premium-action-card premium-choose-card">
          <div>
            <h2>Choose Your Box</h2>

            <p>Select the perfect box size for your sweet moments.</p>

            <div className="premium-size-row">
              <span>
                6 pcs
                <br />
                120 MDL
              </span>
              <span className="active">
                12 pcs
                <br />
                220 MDL
              </span>
              <span>
                18 pcs
                <br />
                400 MDL
              </span>
            </div>
          </div>

          <img src={chooseImg} alt="Sweet Box macaron box" />
        </article>

        <article className="premium-action-card premium-mix-card">
          <div>
            <h2>Mix Your Flavours</h2>

            <p>Create your own combination and make it uniquely yours.</p>

            <div className="premium-flavour-strip">
              <img src={kiwiImg} alt="Kiwi" />
              <img src={strawberryImg} alt="Strawberry" />
              <img src={chocolatefarmImg} alt="Chocolate Farm" />
              <img src={lemonImg} alt="Lemon" />
              <button type="button" onClick={() => navigate("/mix")}>
                +
              </button>
            </div>

            <button
              type="button"
              className="premium-small-btn"
              onClick={() => navigate("/mix")}
            >
              Start Mixing →
            </button>
          </div>

          <img src={mixImg} alt="Mix macarons" />
        </article>
      </section>

      {/* --- About section --- */}
      <section className="premium-about-section">
        <div className="premium-about-text">
          <h2>About Sweet Box</h2>

          <p>At Sweet Box, every moment deserves a touch of sweetness.</p>

          <p>
            Our macarons are handcrafted in Chisinau, Moldova using fine
            ingredients to bring delicate flavours and beautiful experiences.
          </p>

          <p>Perfect for gifts, celebrations, or simply treating yourself.</p>

          <button type="button" onClick={() => navigate("/about")}>
            Learn More About Us
          </button>
        </div>

        <img src={aboutImg} alt="Macarons on plate" />
      </section>
    </main>
  );
}

export default Home;

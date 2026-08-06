import { useNavigate } from "react-router-dom";

import RealisticMacaronHero from "../components/RealisticMacaronHero.jsx";

import chooseImg from "../assets/images/chose.jpg";
import mixImg from "../assets/images/mixflovers.jpg";
import aboutImg from "../assets/images/about.jpg";

import kiwiImg from "../assets/images/kiwi.jpg";
import strawberryImg from "../assets/images/strawberry.jpg";
import chocolatefarmImg from "../assets/images/chocolatefarm.jpg";
import lemonImg from "../assets/images/lemon.jpg";

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
      <RealisticMacaronHero />

      <section className="premium-products-section">
        <div className="premium-section-header">
          <div>
            <p className="premium-kicker">Small-batch favourites</p>
            <h2>Featured Macarons</h2>
          </div>

          <span>Pre-order available ♡</span>
        </div>

        <div className="premium-products-grid">
          {products.map((product) => (
            <article key={product.name} className="premium-product-card">
              <div className="premium-product-image-wrap">
                <img src={product.image} alt={`${product.name} macarons`} />
              </div>

              <div className="premium-product-info">
                <div>
                  <h3>{product.name}</h3>
                  <p>{product.price}</p>
                </div>

                <button
                  type="button"
                  onClick={() => navigate("/choose")}
                  aria-label={`Add ${product.name} to a box`}
                >
                  +
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="premium-action-grid">
        <article className="premium-action-card premium-choose-card">
          <div>
            <p className="premium-kicker">Choose your format</p>
            <h2>Build Your Perfect Box</h2>
            <p>Select the size that fits your celebration.</p>

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
            <p className="premium-kicker">Make it personal</p>
            <h2>Mix Your Flavours</h2>
            <p>Create a combination that feels unmistakably yours.</p>

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
              Start mixing
            </button>
          </div>

          <img src={mixImg} alt="A mixed selection of macarons" />
        </article>
      </section>

      <section className="premium-about-section">
        <div className="premium-about-text">
          <p className="premium-kicker">Made in Chișinău</p>
          <h2>About Sweet Box</h2>
          <p>At Sweet Box, every moment deserves a touch of sweetness.</p>
          <p>
            Our macarons are handcrafted using fine ingredients to create
            delicate flavours and beautiful experiences.
          </p>
          <p>Perfect for gifts, celebrations, or simply treating yourself.</p>

          <button type="button" onClick={() => navigate("/about")}>
            Discover our story
          </button>
        </div>

        <img src={aboutImg} alt="Macarons arranged on a plate" />
      </section>
    </main>
  );
}

export default Home;

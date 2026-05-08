import { useNavigate } from "react-router-dom";

import bg from "../assets/images/background.jpg";
import chooseImg from "../assets/images/chose.jpg";
import mixImg from "../assets/images/mixflovers.jpg";

function Home() {
  const navigate = useNavigate();

  return (
    <div
      className="home-hero full-bg"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="home-overlay"></div>

      <div className="preorder-floating">
        <h3>Pre-order Available</h3>
        <p>
          Plan ahead by selecting a future date and preferred time during
          checkout.
        </p>
      </div>

      <div className="home-wrapper">
        <div className="hero-content">
          <h1>Sweet Box</h1>

          <p className="text-justify-center">
            Create your perfect macaron experience with personalised boxes,
            custom flavour mixes, and pre-order options.
          </p>

          <div className="home-cards-below">
            <div className="home-card" onClick={() => navigate("/choose")}>
              <img src={chooseImg} alt="Choose box" />
              <span>Choose Box</span>
            </div>

            <div className="home-card" onClick={() => navigate("/mix")}>
              <img src={mixImg} alt="Mix flavours" />
              <span>Mix Flavours</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

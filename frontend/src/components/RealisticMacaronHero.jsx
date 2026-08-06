import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RealisticMacaronHero.css";

import topShell from "../assets/hero/top-shell.webp";
import creamJam from "../assets/hero/cream-jam.webp";
import bottomShell from "../assets/hero/bottom-shell.webp";
import raspberries from "../assets/hero/raspberries.webp";
import petals from "../assets/hero/petals.webp";

function RealisticMacaronHero() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsOpen(true);
    }, 700);

    return () => window.clearTimeout(timer);
  }, []);

  const replayAnimation = () => {
    setIsOpen(false);

    window.setTimeout(() => {
      setIsOpen(true);
    }, 400);
  };

  return (
    <section className={`realistic-hero ${isOpen ? "is-open" : ""}`}>
      <div className="realistic-hero-copy">
        <p className="realistic-hero-label">Handcrafted in Chișinău</p>

        <h1>Delicate moments, beautifully made.</h1>

        <p>
          Crisp shells, smooth cream and fresh flavour combinations, handcrafted
          for every celebration.
        </p>

        <div className="realistic-hero-actions">
          <button type="button" onClick={() => navigate("/choose")}>
            Build Your Box
          </button>

          <button type="button" onClick={replayAnimation}>
            Replay Animation
          </button>
        </div>
      </div>

      <div className="realistic-macaron-stage">
        <div className="realistic-glow" />

        <img
          src={raspberries}
          alt=""
          className="realistic-decoration realistic-raspberries"
        />

        <img
          src={petals}
          alt=""
          className="realistic-decoration realistic-petals"
        />

        <div className="realistic-macaron">
          <img
            src={topShell}
            alt=""
            className="realistic-layer realistic-top-shell"
          />

          <img
            src={creamJam}
            alt=""
            className="realistic-layer realistic-cream"
          />

          <img
            src={bottomShell}
            alt="Strawberry macaron opening to reveal cream and jam"
            className="realistic-layer realistic-bottom-shell"
          />
        </div>

        <div className="realistic-flavour-label">
          <span>Currently tasting</span>
          <strong>Strawberry</strong>
        </div>
      </div>
    </section>
  );
}

export default RealisticMacaronHero;

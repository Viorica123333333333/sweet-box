import { useState } from "react";

/* --- Simple notice used before entering the academic prototype --- */
function Gate({ children }) {
  const [isAccepted, setIsAccepted] = useState(false);

  if (isAccepted) {
    return children;
  }

  return (
    <main className="gate-page">
      <section className="gate-card">
        <h1>Sweet Box</h1>

        <p>
          This website is a project prototype and is intended for demonstration
          purposes only. Think of the checkout process as a simple simulation
          that shows how an order would normally work.
        </p>

        <p>
          No real orders are processed, and no actual payment systems are
          connected. Please do not enter real personal or payment details when
          using this site
        </p>

        <button type="button" onClick={() => setIsAccepted(true)}>
          I understand
        </button>
      </section>
    </main>
  );
}

export default Gate;

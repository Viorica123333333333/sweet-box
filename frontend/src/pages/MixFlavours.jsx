import { useState } from "react";

import mixImg from "../assets/images/mixflovers.jpg";

/* --- Available flavours used for custom macaron mix selection --- */
const flavourOptions = [
  "Strawberry",
  "Chocolate",
  "Pistachio",
  "Caramel Vanilla",
  "Vanilla",
  "Blueberry",
  "Almond",
  "Kiwi",
  "Mango",
  "Lemon",
  "Caramel",
  "Coffee",
  "Peanut",
  "Chocolate Farm",
  "Mint Plombir",
];

/* --- Suggested flavour pairings used to guide customer choices --- */
const flavourPairings = {
  Strawberry: ["Vanilla", "Chocolate", "Pistachio"],
  Chocolate: ["Caramel", "Coffee", "Peanut"],
  Lemon: ["Blueberry", "Vanilla", "Mango"],
  Vanilla: ["Strawberry", "Blueberry", "Caramel"],
  Pistachio: ["Chocolate", "Vanilla", "Coffee"],
  Caramel: ["Chocolate", "Vanilla", "Peanut"],
  Coffee: ["Chocolate", "Caramel", "Pistachio"],
  Blueberry: ["Lemon", "Vanilla", "Mango"],
  Mango: ["Lemon", "Kiwi", "Vanilla"],
  Peanut: ["Chocolate", "Caramel", "Coffee"],
};

/* --- Fixed price for one custom mixed macaron --- */
const mixPrice = 60;

/* --- Quantity options available for custom mixes --- */
const quantityOptions = [1, 2, 3, 4, 5, 6];

function MixFlavours({ customMixes = [], setCustomMixes }) {
  const [flavourOne, setFlavourOne] = useState("");
  const [flavourTwo, setFlavourTwo] = useState("");
  const [mixQuantity, setMixQuantity] = useState(1);
  const [customMix, setCustomMix] = useState("");
  const [popup, setPopup] = useState("");

  const totalPrice = mixPrice * Number(mixQuantity);
  const recommendedPairings = flavourPairings[flavourOne] || [];

  /* --- Shows a temporary message after user actions --- */
  const showPopup = (message) => {
    setPopup(message);
    setTimeout(() => setPopup(""), 1500);
  };

  /* --- Updates the first flavour and resets the existing custom mix result --- */
  const handleFirstFlavourChange = (event) => {
    setFlavourOne(event.target.value);
    setFlavourTwo("");
    setCustomMix("");
  };

  /* --- Updates the second flavour and resets the existing custom mix result --- */
  const handleSecondFlavourChange = (event) => {
    setFlavourTwo(event.target.value);
    setCustomMix("");
  };

  /* --- Applies a recommended flavour as the second mix option --- */
  const applyRecommendedPairing = (flavour) => {
    setFlavourTwo(flavour);
    setCustomMix("");
    showPopup(`${flavour} selected as recommended pairing!`);
  };

  /* --- Validates selected flavours and creates the custom mix name --- */
  const handleCreateMix = () => {
    if (!flavourOne || !flavourTwo) {
      showPopup("Please choose 2 flavours");
      return;
    }

    if (flavourOne === flavourTwo) {
      showPopup("Choose 2 different flavours");
      return;
    }

    const mixName = `${flavourOne} + ${flavourTwo}`;

    setCustomMix(mixName);
    showPopup("Custom mix created!");
  };

  /* --- Adds the created custom mix to the basket/order state --- */
  const handleAddMixToOrder = () => {
    if (!customMix) {
      showPopup("Create a mix first");
      return;
    }

    const newMix = {
      name: customMix,
      quantity: Number(mixQuantity),
      price: mixPrice,
    };

    setCustomMixes([...customMixes, newMix]);

    setFlavourOne("");
    setFlavourTwo("");
    setMixQuantity(1);
    setCustomMix("");

    showPopup("Mix added to basket!");
  };

  return (
    <div className="mix-page">
      {popup && <div className="popup">{popup}</div>}

      <div className="mix-container">
        {/* --- Custom mix builder section --- */}
        <div className="mix-text-card">
          <h1>Mix Your Flavours</h1>

          <p>
            Create your own macaron combination by choosing two flavours and
            blending them into a unique experience.
          </p>

          <p className="mix-feature-note">
            Need inspiration? Select the first flavour and Sweet Box will
            suggest balanced flavour pairings for your custom macaron.
          </p>

          <div className="mix-builder">
            {/* --- First flavour selection --- */}
            <div className="mix-select-group">
              <label>First flavour</label>

              <select value={flavourOne} onChange={handleFirstFlavourChange}>
                <option value="">Choose a flavour</option>

                {flavourOptions.map((flavour) => (
                  <option key={flavour} value={flavour}>
                    {flavour}
                  </option>
                ))}
              </select>
            </div>

            {/* --- Recommended pairing suggestions --- */}
            {flavourOne && (
              <div className="pairing-box">
                <h3>Recommended pairings for {flavourOne}</h3>

                {recommendedPairings.length > 0 ? (
                  <div className="pairing-options">
                    {recommendedPairings.map((flavour) => (
                      <button
                        key={flavour}
                        type="button"
                        className={
                          flavourTwo === flavour
                            ? "pairing-btn active-pairing"
                            : "pairing-btn"
                        }
                        onClick={() => applyRecommendedPairing(flavour)}
                      >
                        {flavour}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p>
                    No specific recommendation is available for this flavour.
                    You can still choose any second flavour below.
                  </p>
                )}
              </div>
            )}

            {/* --- Second flavour selection --- */}
            <div className="mix-select-group">
              <label>Second flavour</label>

              <select value={flavourTwo} onChange={handleSecondFlavourChange}>
                <option value="">Choose a flavour</option>

                {flavourOptions.map((flavour) => (
                  <option key={flavour} value={flavour}>
                    {flavour}
                  </option>
                ))}
              </select>
            </div>

            <button className="mix-create-btn" onClick={handleCreateMix}>
              Create My Mix
            </button>

            {customMix && (
              <div className="mix-result-card">
                <h3>Your Custom Mix</h3>

                <p>{customMix}</p>
                <p>Price per macaron: {mixPrice + "\u00A0MDL"}</p>
                <p>Total: {totalPrice + "\u00A0MDL"}</p>

                {/* --- Quantity selection for the created custom mix --- */}
                <div className="mix-select-group">
                  <label>Quantity</label>

                  <select
                    value={mixQuantity}
                    onChange={(event) => setMixQuantity(event.target.value)}
                  >
                    {quantityOptions.map((quantity) => (
                      <option key={quantity} value={quantity}>
                        {quantity} {quantity === 1 ? "macaron" : "macarons"}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  className="mix-create-btn"
                  onClick={handleAddMixToOrder}
                >
                  Add Mix to Basket
                </button>
              </div>
            )}
          </div>
        </div>

        {/* --- Supporting image section --- */}
        <div className="mix-image-wrap">
          <img
            src={mixImg}
            alt="Custom macaron flavour mix"
            className="mix-image"
          />
        </div>
      </div>
    </div>
  );
}

export default MixFlavours;

import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import strawberry from "../assets/images/strawberry.jpg"; /* --- Unsplash(2025)	Free to use under the Unsplash License, Available at: https://unsplash.com/photos/red-macarons-are-stacked-on-a-white-background-LJp0ft6FOuk (Accessed, 2026) --- */
import chocolate from "../assets/images/chocolate.jpg"; /* --- Unsplash(2022)	Free to use under the Unsplash License, Available at: https://unsplash.com/photos/a-glass-of-milk-and-some-cookies-on-a-table-UXhUQNQMbrg(Accessed, 2026) --- */
import pistachio from "../assets/images/pistachio.jpg"; /* --- Unsplash(2019)	Free to use under the Unsplash License, Available at: https://unsplash.com/photos/milk-in-clear-glass-jar-6eHegE5M_ag (Accessed, 2026) --- */
import caramelVanilla from "../assets/images/caramelvanilla.jpg"; /* --- Unsplash(2022)	Free to use under the Unsplash License, Available at:https://unsplash.com/photos/a-plate-of-cookies-hF1UugJeyU4(Accessed, 2026) --- */
import vanilla from "../assets/images/vanila.jpg"; /* --- Unsplash(2020)	Free to use under the Unsplash License, Available at: https://unsplash.com/photos/brown-nuts-on-white-textile-WYtK4TffpS8 (Accessed, 2026) --- */
import blueberry from "../assets/images/bluberry.jpg"; /* --- Unsplash(2021)	Free to use under the Unsplash License, Available at: https://unsplash.com/photos/a-piece-of-cake-on-a-plate-3IoXbeD1D-Q(Accessed, 2026) --- */
import almond from "../assets/images/almond.jpg"; /* --- Unsplash(2019)	Free to use under the Unsplash License, Available at: https://unsplash.com/photos/baked-macaroons-7lVp-P_mx9M (Accessed, 2026) --- */
import kiwi from "../assets/images/kiwi.jpg"; /* --- Unsplash(202)	Free to use under the Unsplash License, Available at: https://unsplash.com/photos/heres-a-caption-green-macarons-are-stacked-on-a-white-surface-4FteM5r5ShA(Accessed, 2026) --- */
import mango from "../assets/images/mango.jpg"; /* --- Unsplash(2020)	Free to use under the Unsplash License, Available at: https://unsplash.com/photos/sliced-apple-fruit-on-brown-wooden-table-CYN5jlWPxDE (Accessed, 2026) --- */
import lemon from "../assets/images/lemon.jpg"; /* --- Unsplash(2022)	Free to use under the Unsplash License, Available at: https://unsplash.com/photos/a-plate-of-food-V2l65W-4G14(Accessed, 2026) --- */
import caramel from "../assets/images/caramel.jpg"; /* --- Unsplash(2023)	Free to use under the Unsplash License, Available at: https://unsplash.com/photos/a-couple-of-trays-of-food-sitting-on-top-of-a-table-cPr17b5T9qI(Accessed, 2026) --- */
import coffee from "../assets/images/coffe.jpg"; /* --- Unsplash(2023)	Free to use under the Unsplash License, Available at: https://unsplash.com/photos/a-stack-of-chocolate-macaroons-sitting-on-top-of-a-wooden-table-ROwNQpkbxM0 (Accessed, 2026) --- */
import peanut from "../assets/images/peanut.jpg"; /* --- Unsplash(2020)	Free to use under the Unsplash License, Available at: https://unsplash.com/photos/brown-and-white-round-ornament-h4hezLzzZsM(Accessed, 2026) --- */
import chocolateFarm from "../assets/images/chocolatefarm.jpg"; /* --- Unsplash(2021)	Free to use under the Unsplash License, Available at: https://unsplash.com/photos/burger-with-sliced-tomato-and-green-vegetable-G3UBvnlaudI(Accessed, 2026) --- */
import mintPlombir from "../assets/images/mintplombir.jpg"; /* --- Unsplash(2016)	Free to use under the Unsplash License, Available at: https://unsplash.com/photos/person-holding-round-cookie-near-green-leaf-vegetable-VU1Er1yeipk (Accessed, 2026) --- */

/* --- Product catalogue used to display available macaron flavours --- */
const products = [
  { name: "Strawberry", image: strawberry },
  { name: "Chocolate", image: chocolate },
  { name: "Pistachio", image: pistachio },
  { name: "Caramel Vanilla", image: caramelVanilla },
  { name: "Vanilla", image: vanilla },
  { name: "Blueberry", image: blueberry },
  { name: "Almond", image: almond },
  { name: "Kiwi", image: kiwi },
  { name: "Mango", image: mango },
  { name: "Lemon", image: lemon },
  { name: "Caramel", image: caramel },
  { name: "Coffee", image: coffee },
  { name: "Peanut", image: peanut },
  { name: "Chocolate Farm", image: chocolateFarm },
  { name: "Mint Plombir", image: mintPlombir },
];

/* --- Fixed prices assigned to each available box size --- */
const boxPrices = {
  6: 120,
  12: 220,
  18: 400,
};

/* --- Counts repeated macarons so the basket can show quantity per flavour --- */
const groupMacarons = (items) =>
  items.reduce((groupedItems, item) => {
    groupedItems[item] = (groupedItems[item] || 0) + 1;
    return groupedItems;
  }, {});

function MacaronSelector({
  box,
  setBox,
  boxSize,
  setBoxSize,
  savedBoxes,
  setSavedBoxes,
}) {
  const [popup, setPopup] = useState("");
  const navigate = useNavigate();

  /* --- Creates quick access to product images by flavour name --- */
  const productMap = useMemo(
    () =>
      Object.fromEntries(products.map((product) => [product.name, product])),
    [],
  );

  /* --- Groups selected macarons for the current visible box summary --- */
  const groupedBox = useMemo(() => groupMacarons(box), [box]);

  const totalPrice = boxPrices[boxSize] || 0;

  /* --- Displays a short feedback message after user actions --- */
  const showPopup = (message) => {
    setPopup(message);
    setTimeout(() => setPopup(""), 1500);
  };

  /* --- Adds one macaron if the selected box still has available space --- */
  const addMacaron = (flavourName) => {
    if (box.length >= boxSize) {
      showPopup("Your box is full!");
      return;
    }

    setBox((currentBox) => [...currentBox, flavourName]);
    showPopup(`${flavourName} added!`);
  };

  /* --- Removes the most recently selected macaron of the chosen flavour --- */
  const removeMacaron = (flavourName) => {
    const macaronIndex = box.lastIndexOf(flavourName);

    if (macaronIndex === -1) return;

    const updatedBox = [...box];
    updatedBox.splice(macaronIndex, 1);

    setBox(updatedBox);
  };

  /* --- Clears the current box without changing the selected box size --- */
  const resetBox = () => {
    setBox([]);
  };

  /* --- Updates the box size and clears previous selections to avoid mismatch --- */
  const changeBoxSize = (size) => {
    setBoxSize(size);
    setBox([]);
  };

  /* --- Saves the completed box into the basket before checkout --- */
  const addBoxToBasket = () => {
    if (box.length === 0) {
      showPopup("Your box is empty!");
      return;
    }

    if (box.length < boxSize) {
      showPopup("Please complete your box before adding it to basket!");
      return;
    }

    const newBox = {
      id: Date.now(),
      boxSize,
      items: [...box],
      groupedItems: groupMacarons(box),
      price: totalPrice,
    };

    setSavedBoxes((currentBoxes) => [...currentBoxes, newBox]);

    setBox([]);
    setBoxSize(6);
    showPopup("Box added to basket!");
  };

  return (
    <div className="selector-page">
      {popup && <div className="popup">{popup}</div>}

      {/* --- Page heading and box size selection --- */}
      <div className="selector-header">
        <h2 className="sweet-title">Build Your Sweet Box</h2>
        <p>Select your box size and choose your favourite macarons.</p>

        <div className="size-buttons">
          {Object.entries(boxPrices).map(([size, price]) => {
            const numericSize = Number(size);
            const isActive = boxSize === numericSize;

            return (
              <button
                key={size}
                className={isActive ? "size-btn active-size" : "size-btn"}
                onClick={() => changeBoxSize(numericSize)}
              >
                Box of {size} • {price + "\u00A0MDL"}
              </button>
            );
          })}
        </div>
      </div>

      {/* --- Main product and basket layout --- */}
      <div className="shop-layout">
        <div className="products-section">
          <h3 className="choose-title">Choose your macarons</h3>

          <div className="flavour-grid">
            {products.map((product) => (
              <div
                key={product.name}
                className="flavour-card"
                onClick={() => addMacaron(product.name)}
              >
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* --- Current box summary and checkout actions --- */}
        <div className="cart-section">
          <div className="cart-panel">
            <div className="cart-panel-header">
              <h3>Your Box</h3>
              <button onClick={resetBox}>Reset Box</button>
            </div>

            <div className="cart-box">
              {Object.keys(groupedBox).length === 0 ? (
                <p>Your box is empty.</p>
              ) : (
                Object.entries(groupedBox).map(([name, quantity]) => (
                  <div key={name} className="cart-item">
                    <img
                      src={productMap[name].image}
                      alt={name}
                      className="cart-thumb"
                    />

                    <div className="cart-info">
                      <h4>{name}</h4>
                    </div>

                    <div className="cart-controls">
                      <button onClick={() => removeMacaron(name)}>-</button>
                      <span>{quantity}</span>
                      <button onClick={() => addMacaron(name)}>+</button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="cart-summary">
              <p>
                Selected: {box.length} / {boxSize}
              </p>
              <p>Total price: {totalPrice + "\u00A0MDL"}</p>
              <p>Saved boxes: {savedBoxes.length}</p>
            </div>

            <div className="cart-actions">
              <button className="basket-btn" onClick={addBoxToBasket}>
                Add Box to Basket
              </button>

              <button
                className="checkout-btn"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MacaronSelector;

import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Gate from "./components/Gate";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import ChooseBox from "./pages/ChooseBox";
import MixFlavours from "./pages/MixFlavours";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Checkout from "./pages/Checkout";

/* --- Root application component controlling global state and routing --- */
function App() {
  const [box, setBox] = useState([]);
  const [boxSize, setBoxSize] = useState(6);
  const [savedBoxes, setSavedBoxes] = useState([]);
  const [customMixes, setCustomMixes] = useState([]);

  const basketCount = savedBoxes.length + customMixes.length;

  return (
    <Gate>
      <Navbar basketCount={basketCount} />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/choose"
          element={
            <ChooseBox
              box={box}
              setBox={setBox}
              boxSize={boxSize}
              setBoxSize={setBoxSize}
              savedBoxes={savedBoxes}
              setSavedBoxes={setSavedBoxes}
            />
          }
        />

        <Route
          path="/mix"
          element={
            <MixFlavours
              customMixes={customMixes}
              setCustomMixes={setCustomMixes}
            />
          }
        />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route
          path="/checkout"
          element={
            <Checkout
              savedBoxes={savedBoxes}
              setSavedBoxes={setSavedBoxes}
              customMixes={customMixes}
              setCustomMixes={setCustomMixes}
            />
          }
        />
      </Routes>

      <footer className="footer">
        © {new Date().getFullYear()} Sweet Box
        <br />
        <span>
          Sweet Box Bakery, Sweet Street 21, Chisinau, Republic of Moldova,
          DM-21BX
        </span>
      </footer>
    </Gate>
  );
}

export default App;

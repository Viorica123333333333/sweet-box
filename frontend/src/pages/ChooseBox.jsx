import MacaronSelector from "../components/MacaronSelector";

/* --- Page wrapper for the macaron box customisation section --- */
function ChooseBox({
  box,
  setBox,
  boxSize,
  setBoxSize,
  savedBoxes,
  setSavedBoxes,
}) {
  return (
    <main className="choose-box-page">
      <MacaronSelector
        box={box}
        setBox={setBox}
        boxSize={boxSize}
        setBoxSize={setBoxSize}
        savedBoxes={savedBoxes}
        setSavedBoxes={setSavedBoxes}
      />
    </main>
  );
}

export default ChooseBox;

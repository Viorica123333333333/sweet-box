import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./index.css";

/* --- Creates the React root element inside the HTML container --- */
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    {/* --- Enables client-side routing between application pages --- */}
    <BrowserRouter>
      {/* --- Main application component --- */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);

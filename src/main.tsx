import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Popup from "./views/Popup";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Popup />
    <h1>XD</h1>
  </StrictMode>,
);

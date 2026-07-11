import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import CompatApp from "./CompatApp";
import "./global.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CompatApp />
  </StrictMode>,
);

import { NuqsAdapter } from "nuqs/adapters/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ViewRouter from "./ViewRouter";
import "./global.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NuqsAdapter>
      <ViewRouter />
    </NuqsAdapter>
  </StrictMode>,
);

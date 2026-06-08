import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Client-side redirect for /discord
if (
  window.location.pathname.toLowerCase() === "/discord" ||
  window.location.pathname.toLowerCase() === "/discord/"
) {
  document.body.innerHTML = `<div style="height: 100vh; display: flex; align-items: center; justify-content: center; font-family: 'DM Sans', system-ui; font-size: 1.5rem; background: #070707; color: white;">Mengalihkan ke Discord...</div>`;
  window.location.href = "https://discord.gg/EsBAtszGKQ";
} else {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

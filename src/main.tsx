import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Disable scroll restoration globally for instant hero landing
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// Immediate scroll reset on page initialization
window.scrollTo(0, 0);

createRoot(document.getElementById("root")!).render(<App />);

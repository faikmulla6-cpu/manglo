import { createRoot } from "react-dom/client";
import { DemoOne } from "@/components/demo";
import { ToolChat } from "@/components/tool-chat";
import "./hero.css";
import "./chat.css";

// A progressive React island: the server-rendered Manglo hero is retained if
// scripts are unavailable, and the existing image studio remains untouched.
const pathname = window.location.pathname.replace(/\/+$/, "");
if (pathname === "" || pathname === "/index.html") {
  const copy = document.querySelector<HTMLElement>(".premium-hero .hero-copy");
  const studio = document.querySelector<HTMLElement>(".premium-hero .studio-window");

  if (copy && studio) {
    copy.id = "manglo-hero-root";
    studio.id = "manglo-studio";
    copy.closest(".premium-hero")?.classList.add("manglo-hero-upgraded");
    createRoot(copy).render(<DemoOne />);
  }

  // Replace the old seven-card landing area with one fully interactive,
  // browser-local task workspace. Crawlable tool links remain in the HTML.
  const chat = document.getElementById("manglo-chat-root");
  if (chat) createRoot(chat).render(<ToolChat />);
}

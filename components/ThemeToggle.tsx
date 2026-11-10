"use client";

import { useSyncExternalStore } from "react";
import { Monitor, Moon, Sun } from "lucide-react";

type Choice = "system" | "light" | "dark";
const KEY = "theme";
const order: Choice[] = ["system", "light", "dark"];
const label: Record<Choice, string> = { system: "System", light: "Light", dark: "Dark" };

// The visitor's choice lives in localStorage; "system" means no choice (follow the device).
const read = (): Choice => {
  try {
    const v = localStorage.getItem(KEY);
    return v === "light" || v === "dark" ? v : "system";
  } catch {
    return "system"; // storage blocked (private mode): just follow the system
  }
};

const subscribe = (onChange: () => void) => {
  window.addEventListener("storage", onChange);
  window.addEventListener("themechange", onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener("themechange", onChange);
  };
};

/** Applies a choice to <html>. app/layout.tsx runs the same logic inline before first paint. */
function apply(choice: Choice) {
  const root = document.documentElement;
  if (choice === "system") root.removeAttribute("data-theme");
  else root.setAttribute("data-theme", choice);
  try {
    if (choice === "system") localStorage.removeItem(KEY);
    else localStorage.setItem(KEY, choice);
  } catch { /* ignore */ }
  window.dispatchEvent(new Event("themechange"));
}

/** One button that cycles System → Light → Dark. */
export function ThemeToggle() {
  const choice = useSyncExternalStore(subscribe, read, () => "system" as Choice);
  const next = order[(order.indexOf(choice) + 1) % order.length];
  const Icon = choice === "light" ? Sun : choice === "dark" ? Moon : Monitor;

  return (
    <button
      onClick={() => apply(next)}
      title={`Theme: ${label[choice]}`}
      aria-label={`Theme: ${label[choice]}. Switch to ${label[next]}`}
      className="label inline-flex items-center gap-2 rounded-full border border-line px-3 py-2.5 text-dim transition-colors hover:text-ink"
    >
      <Icon className="size-3.5" />
      <span className="hidden sm:inline">{label[choice]}</span>
    </button>
  );
}

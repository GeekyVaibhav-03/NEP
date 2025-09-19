import React, { useEffect, useState } from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  });

  useEffect(() => {
    const root = document.documentElement; // <html>
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button
      className="inline-flex items-center gap-2 px-3 py-1 rounded border border-slate-300/60 dark:border-slate-700/50 bg-white/60 dark:bg-slate-800/60 hover:bg-white/80 hover:dark:bg-slate-800"
      onClick={() => setDark((d) => !d)}
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      {dark ? (
        <LightModeIcon fontSize="small" />
      ) : (
        <DarkModeIcon fontSize="small" />
      )}
      <span className="text-sm">{dark ? "Light" : "Dark"}</span>
    </button>
  );
}

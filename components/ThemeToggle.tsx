"use client";

import { useEffect, useState } from "react";
import { Moon, Sun1 } from "iconsax-react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  // Lit le thème réel (posé par le script du layout) une fois la page chargée
  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
    setDark(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      role="switch"
      aria-checked={dark}
      aria-label={dark ? "Passer en mode clair" : "Passer en mode sombre"}
      className="relative h-9 w-[4.5rem] shrink-0 rounded-full bg-[#FF4D1C] transition-colors duration-300 dark:bg-[#1f2029]"
    >
      {/* Soleil (visible en mode clair, à gauche) */}
      <Sun1
        size={22}
        variant="Linear"
        color="white"
        className="absolute left-2.5 top-1/2 -translate-y-1/2 transition-all duration-300 dark:scale-50 dark:opacity-0"
      />

      {/* Lune (visible en mode sombre, à droite) */}
      <Moon
        size={20}
        variant="Linear"
        color="white"
        className="absolute right-2.5 top-1/2 -translate-y-1/2 scale-50 opacity-0 transition-all duration-300 dark:scale-100 dark:opacity-100"
      />

      {/* Rond blanc qui glisse */}
      <span
        aria-hidden
        className="absolute left-1 top-1 size-7 translate-x-[2.25rem] rounded-full bg-white shadow-sm transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] dark:translate-x-0"
      />
    </button>
  );
}
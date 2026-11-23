"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Home2, Profile, Briefcase, Sms } from "iconsax-react";
import ThemeToggle from "./ThemeToggle";
import CvButton from "./CvButton";

import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import ProjectsPage from "./ProjectsPage";
import ContactPage from "./ContactPage";

const items = [
  { title: "Accueil", icon: Home2, component: <HomePage /> },
  { title: "À propos", icon: Profile, component: <AboutPage /> },
  { title: "Projets", icon: Briefcase, component: <ProjectsPage /> },
  { title: "Contact", icon: Sms, component: <ContactPage /> },
];

export default function Navbar() {
  const [active, setActive] = useState(items[0].title);
  const current = items.find((item) => item.title === active)!;

  const select = (title: string) => {
    setActive(title);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Barre : couleur différente de la page, sans bordure en bas */}
      <header className="sticky top-0 z-50 bg-stone-100 dark:bg-stone-900">
        <nav className="mx-auto grid h-16 max-w-6xl grid-cols-[1fr_auto] items-center gap-4 px-6 md:grid-cols-[1fr_auto_1fr]">
          {/* Logo */}
          <button
            type="button"
            onClick={() => select(items[0].title)}
            aria-label="Accueil"
            className="justify-self-start"
          >
            <img src="/logo/manoait.svg" alt="Logo" className="h-6 w-auto dark:invert" />
          </button>

          {/* Onglets desktop : alignés en bas de la barre */}
          <div
            role="tablist"
            className="hidden h-12 items-stretch gap-2 self-end md:flex
                       [--tab-bg:var(--color-white)] dark:[--tab-bg:var(--color-stone-950)]"
          >
            {items.map(({ title, icon: Icon }, i) => {
              const isActive = active === title;
              const prevActive = i > 0 && active === items[i - 1].title;
              return (
                <div key={title} className="flex items-stretch">
                  {/* Séparateur (masqué autour de l'onglet actif) */}
                  {i > 0 && (
                    <span
                      aria-hidden
                      className={`my-3.5 mr-2 w-px bg-stone-300 transition-opacity dark:bg-stone-700 ${
                        isActive || prevActive ? "opacity-0" : "opacity-100"
                      }`}
                    />
                  )}

                  <button
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => select(title)}
                    className={`relative flex items-center gap-2 px-4 text-sm font-medium transition-colors ${
                      isActive
                        ? "text-stone-900 dark:text-white"
                        : "text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="desktop-tab-indicator"
                        className="absolute inset-0 rounded-t-xl bg-[var(--tab-bg)]"
                        transition={{ type: "spring", bounce: 0.15, duration: 0.45 }}
                      >
                        {/* Coin concave gauche */}
                        <span
                          aria-hidden
                          className="absolute -left-4 bottom-0 size-4"
                          style={{
                            background:
                              "radial-gradient(circle at top left, transparent 15.5px, var(--tab-bg) 16px)",
                          }}
                        />
                        {/* Coin concave droit */}
                        <span
                          aria-hidden
                          className="absolute -right-4 bottom-0 size-4"
                          style={{
                            background:
                              "radial-gradient(circle at top right, transparent 15.5px, var(--tab-bg) 16px)",
                          }}
                        />
                      </motion.span>
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      <Icon
                        size={18}
                        variant={isActive ? "Bold" : "Outline"}
                        color="currentColor"
                      />
                      {title}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Actions à droite */}
          <div className="flex items-center justify-end gap-3">
            <CvButton />
            <ThemeToggle />
          </div>
        </nav>
      </header>

      {/* Contenu : fond pleine largeur, contenu centré */}
      <main className="min-h-[calc(100vh-4rem)] bg-white dark:bg-stone-950">
        <div className="mx-auto max-w-6xl px-6 py-12 pb-28 md:pb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
            >
              {current.component}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Onglets mobile (barre du bas) */}
      <nav className="fixed bottom-0 left-0 z-[100] w-full border-t border-stone-200 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden dark:border-stone-800 dark:bg-stone-950/95">
        <div className="flex items-center justify-around p-2">
          {items.map(({ title, icon: Icon }) => {
            const isActive = active === title;
            return (
              <button
                key={title}
                type="button"
                onClick={() => select(title)}
                className={`relative flex flex-1 flex-col items-center gap-1 py-2 text-[10px] font-semibold tracking-wide transition-colors ${
                  isActive
                    ? "text-indigo-700 dark:text-indigo-300"
                    : "text-stone-500 dark:text-stone-400"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="mobile-tab-indicator"
                    className="absolute inset-0 rounded-xl bg-indigo-50 ring-1 ring-indigo-200 dark:bg-white/10 dark:ring-white/20"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10 flex flex-col items-center gap-1">
                  <Icon
                    size={22}
                    variant={isActive ? "Bold" : "Outline"}
                    color="currentColor"
                  />
                  {title}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
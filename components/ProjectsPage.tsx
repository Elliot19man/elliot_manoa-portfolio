"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Globe,
  ImageIcon,
  Palette,
  Smartphone,
  X,
} from "lucide-react";
import type { IconType } from "react-icons";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiPhp,
  SiLaravel,
  SiFirebase,
  SiExpo,
  SiFlutter,
  SiGithub,
} from "react-icons/si";
import { anton, montserrat } from "@/app/fonts";

const ACCENT = "#FF4D1C";
const CURRENT = "currentColor";

type Design = { title: string; src: string; width: number; height: number };

/* --- TECHNOLOGIES DISPONIBLES (utilisez la clé dans vos projets) --- */
const T: Record<string, { name: string; Icon: IconType; color: string }> = {
  react: { name: "React", Icon: SiReact, color: "#61DAFB" },
  next: { name: "Next.js", Icon: SiNextdotjs, color: CURRENT },
  ts: { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  js: { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
  tailwind: { name: "Tailwind", Icon: SiTailwindcss, color: "#06B6D4" },
  node: { name: "Node.js", Icon: SiNodedotjs, color: "#5FA04E" },
  express: { name: "Express", Icon: SiExpress, color: CURRENT },
  mongo: { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
  postgres: { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
  mysql: { name: "MySQL", Icon: SiMysql, color: "#4479A1" },
  php: { name: "PHP", Icon: SiPhp, color: "#777BB4" },
  laravel: { name: "Laravel", Icon: SiLaravel, color: "#FF2D20" },
  firebase: { name: "Firebase", Icon: SiFirebase, color: "#FFCA28" },
  expo: { name: "Expo", Icon: SiExpo, color: CURRENT },
  flutter: { name: "Flutter", Icon: SiFlutter, color: "#02569B" },
};

/* --- PROJETS WEB --- */
const webProjects = [
  {
    name: "Boutique en ligne",
    image: "/projects/web-1.jpg",
    description:
      "Site e-commerce complet avec panier, paiement et tableau de bord d'administration.",
    techs: ["next", "ts", "tailwind", "postgres"],
    link: "https://github.com/votre-compte/boutique",
  },
  {
    name: "Gestion de stock",
    image: "/projects/web-2.jpg",
    description:
      "Application de suivi des produits, des entrées et des sorties, avec statistiques en temps réel.",
    techs: ["react", "node", "express", "mongo"],
    link: "https://github.com/votre-compte/stock",
  },
  {
    name: "Site vitrine",
    image: "/projects/web-3.jpg",
    description:
      "Site rapide et responsive pour une entreprise locale, optimisé pour le référencement.",
    techs: ["next", "tailwind"],
    link: "https://github.com/votre-compte/vitrine",
  },
];

/* --- APPLICATIONS MOBILE (style Play Store) --- */
const mobileApps = [
  {
    name: "ISRAS",
    category: "Finance",
    icon: "/logo/DGI.png",
    description:
      "Enregistrement des activités entre les contribuables et fournisseurs",
    screens: [
      "/projects/app-1/1.png",
      "/projects/app-1/2.png",
      "/projects/app-1/3.png",
      "/projects/app-1/4.png",
    ],
    link: "https://github.com/votre-compte/budget",
  },
  {
    name: "Livraison Express",
    category: "Commandes et livraison",
    icon: "/projects/app-2/icon.png",
    description:
      "Commandez, suivez votre livreur sur la carte et payez directement dans l'application.",
    screens: [
      "/projects/app-2/1.png",
      "/projects/app-2/2.png",
      "/projects/app-2/3.png",
      "/projects/app-2/4.png",
    ],
    link: "https://github.com/votre-compte/livraison",
  },
];

const tabs = [
  { id: "web", label: "Web", Icon: Globe },
  { id: "mobile", label: "Mobile", Icon: Smartphone },
  { id: "design", label: "Design", Icon: Palette },
];

/* Image avec repli si le fichier n'existe pas encore */
function SafeImage({
  src,
  alt,
  className = "object-cover",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-[#FF4D1C]/20 to-stone-300/40 text-stone-400 dark:to-stone-700/40">
        <ImageIcon size={28} />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
      className={className}
      // SVG et GIF : affichés tels quels (pas d'optimisation)
      unoptimized={/\.(svg|gif)$/i.test(src)}
      onError={() => setFailed(true)}
    />
  );
}

/* Bouton « Voir plus » (GitHub) */
function MoreButton({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
      style={{ backgroundColor: ACCENT }}
    >
      <SiGithub size={15} />
      Voir plus
      <ArrowUpRight size={15} />
    </a>
  );
}

/* --- ONGLET WEB --- */
function WebGrid() {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {webProjects.map((p) => (
        <article
          key={p.name}
          className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-stone-50 transition-colors hover:border-[#FF4D1C] dark:border-stone-800 dark:bg-stone-900 dark:hover:border-[#FF4D1C]"
        >
          <div className="relative aspect-video overflow-hidden bg-stone-200 dark:bg-stone-800">
            <SafeImage
              src={p.image}
              alt={p.name}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <div className="flex flex-1 flex-col gap-3 p-5">
            <h3 className="text-lg font-bold">{p.name}</h3>

            <div className="flex flex-wrap gap-2">
              {p.techs.map((key) => {
                const { name, Icon, color } = T[key];
                return (
                  <span
                    key={key}
                    className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-2.5 py-1 text-xs font-medium dark:border-stone-700 dark:bg-stone-950"
                  >
                    <Icon size={13} color={color} />
                    {name}
                  </span>
                );
              })}
            </div>

            <p className="flex-1 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
              {p.description}
            </p>

            <div className="mt-1">
              <MoreButton href={p.link} />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

/* --- ONGLET MOBILE (style Play Store) --- */
function MobileList() {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {mobileApps.map((app) => (
        <article
          key={app.name}
          className="overflow-hidden rounded-2xl border border-stone-200 bg-stone-50 p-5 transition-colors hover:border-[#FF4D1C] dark:border-stone-800 dark:bg-stone-900 dark:hover:border-[#FF4D1C]"
        >
          {/* Icône + nom + catégorie */}
          <div className="flex items-center gap-4">
            <div className="relative size-16 shrink-0 overflow-hidden rounded-[22%] bg-stone-200 shadow-md md:size-20 dark:bg-stone-800">
              <SafeImage src={app.icon} alt={`Icône ${app.name}`} />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-lg font-bold md:text-xl">{app.name}</h3>
              <p className="text-sm font-semibold" style={{ color: ACCENT }}>
                {app.category}
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="mt-4 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
            {app.description}
          </p>

          {/* Captures d'écran défilantes */}
          <div className="-mx-5 mt-5 flex snap-x gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:thin]">
            {app.screens.map((screen, i) => (
              <div
                key={screen}
                className="relative aspect-[9/19] w-32 shrink-0 snap-start overflow-hidden rounded-2xl border border-stone-200 bg-stone-200 md:w-36 dark:border-stone-700 dark:bg-stone-800"
              >
                <SafeImage src={screen} alt={`${app.name} écran ${i + 1}`} />
              </div>
            ))}
          </div>

          {/* Bouton */}
          <div className="mt-4">
            <MoreButton href={app.link} />
          </div>
        </article>
      ))}
    </div>
  );
}

/* --- VISIONNEUSE EN GRAND PLAN --- */
function Lightbox({
  designs,
  index,
  onClose,
  onNavigate,
}: {
  designs: Design[];
  index: number;
  onClose: () => void;
  onNavigate: (next: number) => void;
}) {
  const [failed, setFailed] = useState(false);
  const item = designs[index];
  const total = designs.length;

  const prev = () => onNavigate((index - 1 + total) % total);
  const next = () => onNavigate((index + 1) % total);

  // Nouvelle image : on réinitialise l'état d'erreur
  useEffect(() => {
    setFailed(false);
  }, [index]);

  // Clavier + blocage du défilement de la page
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  });

  // Rendu dans <body> pour couvrir toute la page (navbar comprise)
  return createPortal(
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      {/* Fermer */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Fermer"
        className="absolute right-4 top-4 z-10 grid size-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
      >
        <X size={22} />
      </button>

      {/* Précédent */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          prev();
        }}
        aria-label="Image précédente"
        className="absolute left-3 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:left-6"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Suivant */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          next();
        }}
        aria-label="Image suivante"
        className="absolute right-3 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:right-6"
      >
        <ChevronRight size={24} />
      </button>

      {/* Image (glissable au doigt) */}
      <motion.div
        key={item.src}
        className="flex max-h-full max-w-full flex-col items-center gap-3"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.3}
        onDragEnd={(_, info) => {
          if (info.offset.x > 80) prev();
          else if (info.offset.x < -80) next();
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {failed ? (
          <div
            className="grid max-h-[80vh] max-w-[90vw] place-items-center rounded-2xl bg-gradient-to-br from-[#FF4D1C]/30 to-stone-700/40 text-white/60"
            style={{
              aspectRatio: `${item.width} / ${item.height}`,
              height: "min(80vh, 600px)",
            }}
          >
            <ImageIcon size={40} />
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.src}
            alt={item.title}
            draggable={false}
            onError={() => setFailed(true)}
            className="max-h-[80vh] max-w-[90vw] select-none rounded-2xl object-contain shadow-2xl"
          />
        )}

        <p className="text-center text-sm font-semibold text-white">
          {item.title}
          <span className="ml-3 font-medium text-white/50">
            {index + 1} / {total}
          </span>
        </p>
      </motion.div>
    </motion.div>,
    document.body
  );
}

/* --- ONGLET DESIGN (mosaïque façon Pinterest) --- */
function DesignMasonry({ designs }: { designs: Design[] | null }) {
  const [selected, setSelected] = useState<number | null>(null);

  // Chargement : cases grises qui pulsent
  if (designs === null) {
    return (
      <div className="columns-2 gap-4 md:columns-3 lg:columns-4">
        {[1.3, 0.8, 1, 1.5, 0.7, 1.1, 1.4, 0.9].map((ratio, i) => (
          <div
            key={i}
            className="mb-4 animate-pulse break-inside-avoid rounded-2xl bg-stone-200 dark:bg-stone-800"
            style={{ aspectRatio: `1 / ${ratio}` }}
          />
        ))}
      </div>
    );
  }

  // Dossier vide
  if (designs.length === 0) {
    return (
      <p className="py-12 text-center text-sm font-medium text-stone-500 dark:text-stone-400">
        Aucune image trouvée. Ajoutez vos fichiers dans{" "}
        <code className="rounded bg-stone-100 px-1.5 py-0.5 dark:bg-stone-800">
          public/design
        </code>
        .
      </p>
    );
  }

  return (
    <>
      <div className="columns-2 gap-4 md:columns-3 lg:columns-4">
        {designs.map((d, i) => (
          <figure
            key={d.src}
            className="group relative mb-4 break-inside-avoid overflow-hidden rounded-2xl bg-stone-200 dark:bg-stone-800"
            style={{ aspectRatio: `${d.width} / ${d.height}` }}
          >
            <SafeImage
              src={d.src}
              alt={d.title}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Zone cliquable sur toute l'image */}
            <button
              type="button"
              onClick={() => setSelected(i)}
              aria-label={`Agrandir : ${d.title}`}
              className="absolute inset-0 z-10 cursor-zoom-in focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#FF4D1C]"
            />

            <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/80 to-transparent p-3 text-sm font-semibold text-white transition-transform duration-300 group-hover:translate-y-0">
              {d.title}
            </figcaption>
          </figure>
        ))}
      </div>

      <AnimatePresence>
        {selected !== null && (
          <Lightbox
            key="lightbox"
            designs={designs}
            index={selected}
            onClose={() => setSelected(null)}
            onNavigate={setSelected}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default function ProjectsPage() {
  const [active, setActive] = useState(tabs[0].id);
  const [designs, setDesigns] = useState<Design[] | null>(null);

  // Charge automatiquement les images du dossier public/design
  useEffect(() => {
    let cancelled = false;
    fetch("/api/designs")
      .then((res) => res.json())
      .then((data: Design[]) => {
        if (!cancelled) setDesigns(data);
      })
      .catch(() => {
        if (!cancelled) setDesigns([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className={`${montserrat.className} space-y-10`}>
      {/* --- EN-TÊTE CENTRÉ --- */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1
          className={`${anton.className} text-4xl font-normal uppercase leading-none tracking-tight md:text-6xl`}
        >
          Projets
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm font-medium text-stone-600 md:text-base dark:text-stone-400">
          Une sélection de mes réalisations récentes.
        </p>
      </motion.div>

      {/* --- TRI PAR ONGLETS (même style que la navbar) --- */}
      <div className="overflow-hidden rounded-3xl border border-stone-200 [--tab-bg:var(--color-white)] dark:border-stone-800 dark:[--tab-bg:var(--color-stone-950)]">
        {/* Barre d'onglets centrée */}
        <div
          role="tablist"
          className="flex items-end justify-center gap-2 bg-stone-100 px-6 pt-4 dark:bg-stone-900"
        >
          {tabs.map(({ id, label, Icon }) => {
            const isActive = active === id;
            return (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(id)}
                className={`relative flex h-11 items-center gap-2 px-4 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-stone-900 dark:text-white"
                    : "text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="projects-tab-indicator"
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
                  <Icon size={16} />
                  {label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Contenu : même couleur que l'onglet actif */}
        <div className="bg-[var(--tab-bg)] p-5 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {active === "web" && <WebGrid />}
              {active === "mobile" && <MobileList />}
              {active === "design" && <DesignMasonry designs={designs} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
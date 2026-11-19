"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, Folder2, People } from "iconsax-react";
import { Globe, Smartphone, Palette } from "lucide-react";
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
  SiPrisma,
  SiGit,
  SiGithub,
  SiExpo,
  SiFlutter,
  SiDart,
  SiKotlin,
  SiAndroid,
  SiFigma,
  SiInkscape,
} from "react-icons/si";
import { TbBrandHtml5, TbBrandCss3 } from "react-icons/tb";
import { Icon as Iconify } from "@iconify/react";
import adobeIllustrator from "@iconify-icons/logos/adobe-illustrator";
import { anton, montserrat } from "@/app/fonts";

const ACCENT = "#FF4D1C";
const CURRENT = "currentColor"; // logos noirs : s'adaptent au thème

// Logo Adobe Illustrator (garde ses propres couleurs)
const SiIllustrator: IconType = ({ size = 28, className }) => (
  <Iconify
    icon={adobeIllustrator}
    width={size as number}
    height={size as number}
    className={className}
  />
);

type Tech = { name: string; Icon: IconType; color: string };

/* --- STATISTIQUES (modifiez les valeurs) --- */
const stats = [
  { label: "Expérience", value: "3+", unit: "ans", Icon: Briefcase },
  { label: "Projets faits", value: "20+", unit: "projets", Icon: Folder2 },
  { label: "Clients", value: "10+", unit: "clients", Icon: People },
];

/* --- TECHNOLOGIES (ajoutez ou retirez librement) --- */
const tabs: { id: string; label: string; Icon: typeof Globe; techs: Tech[] }[] = [
  {
    id: "web",
    label: "Web",
    Icon: Globe,
    techs: [
      { name: "HTML5", Icon: TbBrandHtml5, color: "#E34F26" },
      { name: "CSS3", Icon: TbBrandCss3, color: "#1572B6" },
      { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
      { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
      { name: "React", Icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", Icon: SiNextdotjs, color: CURRENT },
      { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Node.js", Icon: SiNodedotjs, color: "#5FA04E" },
      { name: "Express", Icon: SiExpress, color: CURRENT },
      { name: "PHP", Icon: SiPhp, color: "#777BB4" },
      { name: "Laravel", Icon: SiLaravel, color: "#FF2D20" },
      { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
      { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
      { name: "MySQL", Icon: SiMysql, color: "#4479A1" },
      { name: "Prisma", Icon: SiPrisma, color: CURRENT },
      { name: "Git", Icon: SiGit, color: "#F05032" },
      { name: "GitHub", Icon: SiGithub, color: CURRENT },
    ],
  },
  {
    id: "mobile",
    label: "Mobile",
    Icon: Smartphone,
    techs: [
      { name: "React Native", Icon: SiReact, color: "#61DAFB" },
      { name: "Expo", Icon: SiExpo, color: CURRENT },
      { name: "Flutter", Icon: SiFlutter, color: "#02569B" },
      { name: "Dart", Icon: SiDart, color: "#0175C2" },
      { name: "Kotlin", Icon: SiKotlin, color: "#7F52FF" },
      { name: "Android", Icon: SiAndroid, color: "#3DDC84" },
      { name: "Firebase", Icon: SiFirebase, color: "#FFCA28" },
      { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
    ],
  },
  {
    id: "design",
    label: "Design",
    Icon: Palette,
    techs: [
      { name: "Inkscape", Icon: SiInkscape, color: CURRENT },
      { name: "Figma", Icon: SiFigma, color: "#F24E1E" },
      { name: "Illustrator", Icon: SiIllustrator, color: CURRENT },
    ],
  },
];

export default function AboutPage() {
  const [active, setActive] = useState(tabs[0].id);
  const current = tabs.find((t) => t.id === active)!;

  return (
    <section className={`${montserrat.className} space-y-14`}>
      {/* --- EN-TÊTE : petite photo + présentation --- */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left"
      >
        <div className="relative shrink-0">
          <div
            className="absolute inset-0 rounded-full opacity-40 blur-xl"
            style={{ backgroundColor: ACCENT }}
          />
          <div
            className="relative size-24 overflow-hidden rounded-full ring-2 ring-offset-4 ring-offset-white md:size-28 dark:ring-offset-stone-950"
            style={{ ["--tw-ring-color" as string]: ACCENT }}
          >
            <Image
              src="/images/manoa.jpg"
              alt="RAMIARANARIVO Manoa Elliot"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div>
          <h1
            className={`${anton.className} text-4xl font-normal uppercase leading-none tracking-tight md:text-6xl`}
          >
            À propos
          </h1>
          <p className="mt-3 max-w-xl text-sm font-medium leading-relaxed text-stone-600 md:text-base dark:text-stone-400">
            Je suis{" "}
            <strong className="text-stone-900 dark:text-white">Manoa Elliot</strong>,
            développeur full-stack et designer. J&apos;aime transformer une idée
            en un produit simple, rapide et agréable à utiliser.
          </p>
        </div>
      </motion.div>

      {/* --- 3 CARTES ALIGNÉES --- */}
      <div className="grid grid-cols-3 gap-3 md:gap-6">
        {stats.map(({ label, value, unit, Icon }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="group rounded-2xl border border-stone-200 bg-stone-50 p-3 text-center transition-colors hover:border-[#FF4D1C] md:p-6 md:text-left dark:border-stone-800 dark:bg-stone-900 dark:hover:border-[#FF4D1C]"
          >
            <span
              className="mx-auto grid size-9 place-items-center rounded-xl text-white md:mx-0 md:size-11"
              style={{ backgroundColor: ACCENT }}
            >
              <Icon size={20} variant="Bold" color="currentColor" />
            </span>
            <p
              className={`${anton.className} mt-3 text-3xl leading-none md:mt-5 md:text-6xl`}
            >
              {value}
            </p>
            <p className="mt-1 text-[10px] font-medium uppercase tracking-widest text-stone-500 md:text-xs dark:text-stone-400">
              {unit}
            </p>
            <p className="mt-2 text-xs font-semibold md:mt-3 md:text-base">
              {label}
            </p>
          </motion.div>
        ))}
      </div>

      {/* --- TECHNOLOGIES --- */}
      <div>
        <h2
          className={`${anton.className} mb-6 text-3xl font-normal uppercase tracking-tight md:text-5xl`}
        >
          Mes technologies
        </h2>

        <div className="overflow-hidden rounded-3xl border border-stone-200 [--tab-bg:var(--color-white)] dark:border-stone-800 dark:[--tab-bg:var(--color-stone-950)]">
          {/* Barre d'onglets (même style que la navbar) */}
          <div
            role="tablist"
            className="flex items-end gap-2 bg-stone-100 px-6 pt-4 dark:bg-stone-900"
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
                      layoutId="tech-tab-indicator"
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
                key={current.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
              >
                {current.techs.map(({ name, Icon, color }) => (
                  <div
                    key={name}
                    className="flex items-center gap-3 rounded-xl border border-stone-200 bg-stone-50 px-3 py-3 text-stone-900 transition-all hover:-translate-y-0.5 hover:border-[#FF4D1C] dark:border-stone-800 dark:bg-stone-900 dark:text-white dark:hover:border-[#FF4D1C]"
                  >
                    <Icon size={28} color={color} className="shrink-0" />
                    <span className="truncate text-sm font-medium">{name}</span>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
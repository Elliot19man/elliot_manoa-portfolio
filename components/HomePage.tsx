"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { anton, montserrat } from "@/app/fonts";

const ACCENT = "#FF4D1C"; // change la couleur ici
const DELAY = 3000; // durée d'affichage de chaque mot (ms)

const skills = ["Web", "Mobile", "Designer"];

export default function HomePage() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
  const timer = setInterval(() => {
    setIndex((prev) => (prev + 1) % skills.length);
  }, DELAY);
  return () => clearInterval(timer);
}, []);

  return (
    <div className="flex min-h-[calc(100vh-12rem)] items-center justify-center p-4 font-sans md:p-8 lg:p-12">
      <div className="flex w-full max-w-6xl flex-col-reverse items-center gap-12 lg:flex-row lg:gap-20">
        {/* --- COLONNE DE GAUCHE --- */}
        <div className="flex flex-1 flex-col items-center space-y-4 text-center lg:items-start lg:text-left">
          {/* --- NOM (signature au-dessus du titre) --- */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`${montserrat.className} flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] md:text-sm`}
          >
            <span className="h-px w-8 md:w-12" style={{ backgroundColor: ACCENT }} />
            <span>RAMIARANARIVO Manoa Elliot</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${anton.className} text-5xl font-normal uppercase leading-[1.05] tracking-tight md:text-7xl lg:text-8xl`}
          >
            Développeur <br />
            Full-Stack
          </motion.h1>

          {/* --- MOT QUI CHANGE : les lettres montent une à une --- */}
          <div
            className={`${anton.className} relative h-[1.15em] overflow-hidden text-6xl uppercase leading-[1.15] tracking-wide md:text-7xl lg:text-8xl`}
            style={{ color: ACCENT }}
          >
            <span className="sr-only">{skills[index]}</span>
            <AnimatePresence mode="wait">
              <motion.div
                key={skills[index]}
                aria-hidden
                className="flex"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={{
                  visible: { transition: { staggerChildren: 0.045 } },
                  exit: { transition: { staggerChildren: 0.025 } },
                }}
              >
                {skills[index].split("").map((letter, i) => (
                  <motion.span
                    key={i}
                    className="inline-block"
                    variants={{
                      hidden: { y: "110%" },
                      visible: {
                        y: "0%",
                        transition: { type: "spring", stiffness: 260, damping: 22 },
                      },
                      exit: {
                        y: "-110%",
                        transition: { duration: 0.25, ease: "easeIn" },
                      },
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <p
            className={`${montserrat.className} max-w-lg pt-2 text-base font-medium leading-relaxed text-muted-foreground md:text-lg`}
          >
            Je conçois et développe des solutions numériques robustes et
            intuitives pour donner vie à vos ambitions.
          </p>
          {/* --- Par [Nom] --- */}
          
        </div>

        {/* --- COLONNE DE DROITE (photo en forme de blob) --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative h-72 w-72 shrink-0 md:h-[400px] md:w-[400px]"
        >
          <div
            className="absolute inset-0 animate-pulse rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%] opacity-30 blur-3xl"
            style={{ backgroundColor: ACCENT }}
          />

          <div className="relative h-full w-full overflow-hidden rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%] shadow-2xl">
            <Image
              src="/images/manoa.jpg"
              alt="RAMIARANARIVO Manoa Elliot"
              fill
              className="scale-110 object-cover"
              priority
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
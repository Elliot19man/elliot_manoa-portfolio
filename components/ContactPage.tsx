"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  ImageIcon,
  Loader2,
  Mail,
  Send,
} from "lucide-react";
import { FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";
import { anton, montserrat } from "@/app/fonts";

const ACCENT = "#FF4D1C";
const ILLUSTRATION = "/illustrations/team_work.svg";
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";
const MAX_LENGTH = 500;

/* --- VOS CONTACTS (remplacez les liens) --- */
const contacts = [
  {
    label: "GitHub",
    href: "https://github.com/votre-compte",
    Icon: FaGithub,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/261340000000", // format international, sans + ni espaces
    Icon: FaWhatsapp,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/votre-profil",
    Icon: FaLinkedinIn,
  },
  {
    label: "Email",
    href: "mailto:votre.email@exemple.com",
    Icon: Mail,
  },
];

type Status = "idle" | "sending" | "success" | "error";

const fieldClass =
  "w-full rounded-xl border border-stone-300 bg-stone-50 px-4 py-3 text-sm font-medium text-stone-900 placeholder:text-stone-400 outline-none transition-colors focus:border-[#FF4D1C] focus:ring-2 focus:ring-[#FF4D1C]/20 dark:border-stone-700 dark:bg-stone-900 dark:text-white dark:placeholder:text-stone-500";

export default function ContactPage() {
  const [imageFailed, setImageFailed] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [count, setCount] = useState(0);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Champ piège invisible : seuls les robots le remplissent
    if (data.get("botcheck")) return;

    if (!ACCESS_KEY) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    const name = String(data.get("name") ?? "");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `Nouveau commentaire de ${name}`,
          from_name: "Portfolio",
          name,
          email: data.get("email"),
          message: data.get("message"),
        }),
      });
      const json = await res.json();

      if (json.success) {
        setStatus("success");
        form.reset();
        setCount(0);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className={`${montserrat.className} space-y-20 md:space-y-28`}>
      {/* ================= SECTION 1 : TEXTE + ILLUSTRATION ================= */}
      <section className="relative flex min-h-[calc(100vh-12rem)] items-center pb-16">
        <div className="grid w-full items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* --- COLONNE DE GAUCHE : texte + contacts --- */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em]"
            >
              <span className="h-px w-8 md:w-10" style={{ backgroundColor: ACCENT }} />
              <span>Contact</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`${anton.className} mt-4 text-4xl font-normal uppercase leading-[1.1] tracking-tight md:text-5xl lg:text-6xl`}
            >
              Travaillons <br />
              ensemble pour <br />
              réaliser{" "}
              <span style={{ color: ACCENT }}>vos rêves</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-4 max-w-sm text-sm font-medium leading-relaxed text-stone-600 md:text-base dark:text-stone-400"
            >
              Un projet, une idée ou une simple question ? Écrivez-moi, je
              réponds rapidement.
            </motion.p>

            {/* --- CONTACTS EN CERCLES --- */}
            <ul className="mt-7 flex items-center gap-3 md:gap-4">
              {contacts.map(({ label, href, Icon }, i) => (
                <motion.li
                  key={label}
                  initial={{ opacity: 0, y: 16, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    delay: 0.3 + i * 0.08,
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                  }}
                  className="relative"
                >
                  <a
                    href={href}
                    target={href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="group peer grid size-12 place-items-center rounded-full border border-stone-300 bg-stone-50 text-stone-900 transition-all duration-300 hover:-translate-y-1 hover:border-[#FF4D1C] hover:bg-[#FF4D1C] hover:text-white md:size-14 dark:border-stone-700 dark:bg-stone-900 dark:text-white dark:hover:border-[#FF4D1C] dark:hover:bg-[#FF4D1C]"
                  >
                    <Icon size={20} />
                  </a>

                  {/* Info-bulle */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-stone-900 px-2 py-1 text-xs font-semibold text-white opacity-0 transition-opacity duration-200 peer-hover:opacity-100 peer-focus-visible:opacity-100 dark:bg-white dark:text-stone-900"
                  >
                    {label}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* --- COLONNE DE DROITE : illustration SVG --- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative mx-auto aspect-square w-full max-w-sm lg:max-w-md"
          >
            {imageFailed ? (
              <div className="absolute inset-0 grid place-items-center rounded-3xl bg-gradient-to-br from-[#FF4D1C]/15 to-stone-300/30 text-stone-400 dark:to-stone-700/30">
                <div className="text-center">
                  <ImageIcon size={36} className="mx-auto" />
                  <p className="mt-2 text-xs font-medium">
                    Ajoutez votre image dans
                    <br />
                    <code>public/illustrations/team_work.svg</code>
                  </p>
                </div>
              </div>
            ) : (
              <Image
                src={ILLUSTRATION}
                alt="Illustration : travail d'équipe"
                fill
                priority
                unoptimized
                className="object-contain"
                onError={() => setImageFailed(true)}
              />
            )}
          </motion.div>
        </div>

        {/* --- INDICE : le formulaire est plus bas --- */}
        <motion.button
          type="button"
          onClick={() =>
            document
              .getElementById("commentaire")
              ?.scrollIntoView({ behavior: "smooth", block: "start" })
          }
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          aria-label="Aller au formulaire de commentaire"
          className="absolute bottom-0 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-xs font-semibold uppercase tracking-widest text-stone-500 transition-colors hover:text-[#FF4D1C] dark:text-stone-400 dark:hover:text-[#FF4D1C]"
        >
          Laissez un commentaire
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={20} />
          </motion.span>
        </motion.button>
      </section>

      {/* ================= SECTION 2 : FORMULAIRE DE COMMENTAIRE ================= */}
      <motion.section
        id="commentaire"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="grid scroll-mt-24 gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-16"
        aria-labelledby="comment-title"
      >
        {/* Titre */}
        <div className="text-center lg:text-left">
          <div className="flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] lg:justify-start">
            <span className="h-px w-8 md:w-10" style={{ backgroundColor: ACCENT }} />
            <span>Commentaire</span>
          </div>
          <h2
            id="comment-title"
            className={`${anton.className} mt-4 text-3xl font-normal uppercase leading-[1.1] tracking-tight md:text-4xl lg:text-5xl`}
          >
            Laissez-moi <br />
            un <span style={{ color: ACCENT }}>commentaire</span>
          </h2>
          <p className="mx-auto mt-4 max-w-sm text-sm font-medium leading-relaxed text-stone-600 md:text-base lg:mx-0 dark:text-stone-400">
            Votre avis, une remarque ou une proposition : tout m&apos;intéresse.
            Votre message m&apos;arrive directement par email.
          </p>
        </div>

        {/* Formulaire */}
        <form
          onSubmit={onSubmit}
          className="space-y-4 rounded-3xl border border-stone-200 bg-white p-5 md:p-8 dark:border-stone-800 dark:bg-stone-950"
        >
          {/* Champ piège anti-robots (invisible) */}
          <input
            type="checkbox"
            name="botcheck"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-semibold">
                Nom
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                maxLength={80}
                autoComplete="name"
                placeholder="Votre nom"
                className={fieldClass}
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-semibold">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="vous@exemple.com"
                className={fieldClass}
              />
            </div>
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label htmlFor="message" className="text-sm font-semibold">
                Commentaire
              </label>
              <span className="text-xs font-medium text-stone-400">
                {count}/{MAX_LENGTH}
              </span>
            </div>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              maxLength={MAX_LENGTH}
              placeholder="Écrivez votre commentaire ici..."
              onChange={(e) => setCount(e.target.value.length)}
              className={`${fieldClass} resize-none`}
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            style={{ backgroundColor: ACCENT }}
          >
            {status === "sending" ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Envoi en cours...
              </>
            ) : (
              <>
                <Send size={16} />
                Envoyer le commentaire
              </>
            )}
          </button>

          {/* Messages de retour */}
          <div aria-live="polite">
            {status === "success" && (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 rounded-xl bg-green-500/10 px-4 py-3 text-sm font-medium text-green-700 dark:text-green-400"
              >
                <CheckCircle2 size={18} className="shrink-0" />
                Merci ! Votre commentaire a bien été envoyé.
              </motion.p>
            )}
            {status === "error" && (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 rounded-xl bg-red-500/10 px-4 py-3 text-sm font-medium text-red-700 dark:text-red-400"
              >
                <AlertCircle size={18} className="shrink-0" />
                {ACCESS_KEY
                  ? "Une erreur est survenue. Réessayez ou écrivez-moi directement par email."
                  : "Le formulaire n'est pas encore configuré (clé manquante)."}
              </motion.p>
            )}
          </div>
        </form>
      </motion.section>
    </div>
  );
}
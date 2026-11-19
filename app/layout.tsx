import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Elliot Manoa RAMIARANARIVO Portfolio",
  description: "Portfolio de développeur web",
};

// Applique le thème sauvegardé avant l'affichage (évite le flash blanc)
const themeScript = `
  try {
    var t = localStorage.getItem("theme");
    if (t === "dark" || (!t && matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
    }
  } catch (e) {}
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen bg-white font-sans text-stone-900 dark:bg-stone-950 dark:text-stone-100">
        {children}
      </body>
    </html>
  );
}
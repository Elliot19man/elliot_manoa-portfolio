"use client";

import { DocumentDownload } from "iconsax-react";

export default function CvButton() {
  return (
    <a
      href="/cv.pdf"
      download="CV_RAMIARANARIVO_Manoa_Elliot.pdf"
      aria-label="Télécharger mon CV"
      className="group inline-flex items-center gap-3 rounded-full bg-stone-900 p-1 text-sm font-medium text-white transition-colors hover:bg-stone-800 md:pl-5 dark:bg-white dark:text-stone-900 dark:hover:bg-stone-200"
    >
      <span className="hidden md:inline">Télécharger mon CV</span>
      <span className="grid size-8 place-items-center rounded-full bg-[#FF4D1C] text-white">
        <DocumentDownload
          size={18}
          variant="Bold"
          color="currentColor"
          className="transition-transform duration-300 group-hover:translate-y-0.5"
        />
      </span>
    </a>
  );
}
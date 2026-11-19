import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { imageSize } from "image-size";

const EXT = /\.(jpe?g|png|webp|gif|avif|svg)$/i;

/** "03-logo_studio-bleu.png" → "Logo studio bleu" */
function toTitle(file: string) {
  const name = file
    .replace(/\.[^.]+$/, "") // retire l'extension
    .replace(/^\d+[\s._-]+/, "") // retire un numéro d'ordre au début
    .replace(/[-_]+/g, " ") // tirets et underscores → espaces
    .replace(/\s+/g, " ")
    .trim();
  return name ? name.charAt(0).toUpperCase() + name.slice(1) : file;
}

export async function GET() {
  const dir = path.join(process.cwd(), "public", "design");

  let files: string[] = [];
  try {
    files = (await readdir(dir))
      .filter((f) => EXT.test(f))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  } catch {
    // dossier absent : on renvoie une liste vide
  }

  const items = await Promise.all(
    files.map(async (file) => {
      let width = 800;
      let height = 800;
      try {
        const size = imageSize(await readFile(path.join(dir, file)));
        // Photos prises à la verticale (orientation EXIF) : on inverse
        const swap = (size.orientation ?? 1) >= 5;
        width = (swap ? size.height : size.width) || 800;
        height = (swap ? size.width : size.height) || 800;
      } catch {
        // dimensions illisibles : valeurs par défaut
      }
      return {
        title: toTitle(file),
        src: `/design/${encodeURIComponent(file)}`,
        width,
        height,
      };
    })
  );

  return NextResponse.json(items);
}
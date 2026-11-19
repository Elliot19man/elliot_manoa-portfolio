import { Anton, Kaushan_Script, Montserrat } from "next/font/google";

export const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const kaushan = Kaushan_Script({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
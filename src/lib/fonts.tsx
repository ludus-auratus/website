import { Pixelify_Sans as PixelifySansFont, Poppins as PoppinsFont } from "next/font/google";
import localFont from "next/font/local";

export const fontPoppins = PoppinsFont({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-imported-poppins",
  display: "swap",
});

export const fontPixelify = PixelifySansFont({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-imported-pixelify-sans",
  display: "swap",
});

export const fontBorn2bSporty = localFont({
  src: [
    {
      path: "../assets/fonts/Born2bSportyFS.otf",
      style: "normal",
    },
  ],
  variable: "--font-imported-born2bsporty",
  display: "swap",
});

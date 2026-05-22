import { Fraunces, Sora } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";
import Navbar from "@/components/layout/Navbar";
import CursorGlow from "@/components/animations/CursorGlow";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata = {
  title: {
    default: "TenBit Solutions",
    template: "%s | TenBit Solutions",
  },
  description:
    "TenBit Solutions is a premium digital studio crafting bold brands, products, and experiences.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScrollProvider>
          <CursorGlow />
          <Navbar />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

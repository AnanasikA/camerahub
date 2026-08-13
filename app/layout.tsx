import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/CartContext";
import { UIOverlayProvider } from "@/components/UIOverlayContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import OverlayHost from "@/components/OverlayHost";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "700"],
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "CameraHub — Professional cameras and lenses",
  description:
    "Professional cameras and lenses designed for creators who demand exceptional image quality.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="font-body bg-bg text-fg antialiased">
        <CartProvider>
          <UIOverlayProvider>
            <Header />
            {children}
            <Footer />
            <CartDrawer />
            <OverlayHost />
          </UIOverlayProvider>
        </CartProvider>
      </body>
    </html>
  );
}
import "./globals.css";

import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "sonner";

import Footer from "@/components/shared/footer";

import { CartProvider } from "./[slug]/menu/context/cart";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MC Donalds",
  description: "Projeto MC Donalds desenvolvido por Gabriel Dani de Azevedo",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`flex min-h-screen flex-col ${poppins.className} antialiased`}
      >
        <CartProvider>
          <main className="flex-1">{children}</main>
        </CartProvider>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}

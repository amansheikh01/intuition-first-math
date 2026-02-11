import type { Metadata } from "next";
import { Poppins, Inter, Roboto } from "next/font/google";
import "katex/dist/katex.min.css";
import "./globals.css";

const poppins = Poppins({
  weight: ['400', '600', '700'],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Intuition.Math | Touch the Math",
  description: "Interactive explorations of Linear Algebra, Probability, and Statistics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable} ${roboto.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}

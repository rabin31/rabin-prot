import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

// Acorn font family
const acorn = localFont({
  variable: "--font-acorn",
  src: [
    {
      path: "../fonts/Acorn-Thin.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../fonts/Acorn-ExtraLight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../fonts/Acorn-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/Acorn-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Acorn-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Acorn-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/Acorn-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
});

// Matter font family
const matter = localFont({
  variable: "--font-matter",
  src: [
    {
      path: "../fonts/Matter-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/Matter-LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../fonts/Matter-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Matter-RegularItalic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/Matter-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Matter-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../fonts/Matter-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/Matter-SemiBoldItalic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../fonts/Matter-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/Matter-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../fonts/Matter-Heavy.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../fonts/Matter-HeavyItalic.ttf",
      weight: "800",
      style: "italic",
    },
  ],
});

export const metadata: Metadata = {
  title: "Rabin Thapa • Designer & Developer",
  description: "The portfolio of Rabin Thapa, Designer & Developer.",
  icons: {
    icon: "/favicon.svg",
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
        className={`${acorn.variable} ${matter.variable} antialiased`}
      >
        <Analytics/>
        {children}
      </body>
    </html>
  );
}
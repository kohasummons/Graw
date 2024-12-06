import { Inter, Lato } from "next/font/google";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext", "greek", "greek-ext", "vietnamese"]
});
const lato = Lato({
  variable: "--font-lato",
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin", "latin-ext"]
});

export const metadata = {
  title: "Graw",
  description: "description",
  applicationName: "Graw",
  referrer: "origin-when-cross-origin",
  keywords: ["Web 3"],
  authors: [{ name: "Akande Olalekan Toheeb" }],
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.icon",
    apple: "/favicon.ico",
    other: {
      rel: "/favicon.ico",
      url: "/favicon.",
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${lato.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

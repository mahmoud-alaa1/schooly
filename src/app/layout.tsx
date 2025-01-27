import type { Metadata } from "next";
import { Geist, Geist_Mono, Alexandria } from "next/font/google";
import "../Styles/globals.css";

const alexandria = Alexandria({
  variable: "--font-alexandria",
  subsets: ["latin", "arabic"],
});

export const metadata: Metadata = {
  title: "Schooly",
  description: "Schooly is a platform for students to learn and grow.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="auto">
      <body className={`${alexandria.variable} antialiased`}>{children}</body>
    </html>
  );
}

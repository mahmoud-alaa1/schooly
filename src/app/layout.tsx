import type { Metadata } from "next";
import { Alexandria } from "next/font/google";
import "./globals.css";
import { QueryClientProvider, useQueryClient } from "@tanstack/react-query";
import ClientProviders from "@/providers/ClientProviders";

const alexandria = Alexandria({
  variable: "--font-alexandria",
  subsets: ["latin"],
  display: "auto",
});

export const metadata: Metadata = {
  title: "Schooly",
  description:
    "Schooly is a platform for students to manage their school life.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${alexandria.variable} antialiased p-5 xl:p-10`}>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}

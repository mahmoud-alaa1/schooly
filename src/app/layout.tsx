import type { Metadata } from "next";
import "./globals.css";
import RootLayout from "@/layouts/RootLayout";

export const metadata: Metadata = {
  title: "Schooly",
  description:
    "Schooly is a platform for students to manage their school life.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootLayout>{children}</RootLayout>;
}

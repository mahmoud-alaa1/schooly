import type { Metadata } from "next";
import "./globals.css";
import RootLayout from "@/layouts/RootLayout";

export const metadata: Metadata = {
  title: "Schooly - المنصة التعليمية",
  description: "منصة تعليمية ذكية لإدارة الحصص، الواجبات، بسهولة.",
  openGraph: {
    title: "Schooly - المنصة التعليمية",
    description: "منصة تعليمية ذكية لإدارة الحصص، الواجبات",
    url: "https://schooly.vercel.app/",
    siteName: "Schooly",
    images: [
      {
        url: "https://schooly.vercel.app/hero.png",
        width: 1200,
        height: 630,
        alt: "Schooly Platform Preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Schooly - المنصة التعليمية",
    description: "منصة تعليمية ذكية لإدارة الحصص، الواجبات",
    images: ["https://schooly.vercel.app/hero.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootLayout>{children}</RootLayout>;
}

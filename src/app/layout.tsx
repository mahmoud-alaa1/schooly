import type { Metadata } from "next";
import { Alexandria } from "next/font/google";
import "../Styles/globals.css";
import { AuthProvider } from "@/context/AuthProvider";
import { Toaster } from "react-hot-toast";

const alexandria = Alexandria({
  variable: "--font-alexandria",
  subsets: ["arabic", "latin"],
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
    <html lang="ar" dir="rtl">
      <body className={`${alexandria.className} antialiased min-h-screen`}>
        <Toaster
          position="bottom-left"
          toastOptions={{
            success: {
              style: {
                background: "#10B981",
                color: "#fff",
              },
            },
          }}
        />

        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

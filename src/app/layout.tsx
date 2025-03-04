import type { Metadata } from "next";
import { Alexandria } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import "../Styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
  const queryClient = new QueryClient();

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <html lang="ar" dir="rtl">
          <body className={`${alexandria.className} antialiased min-h-screen`}>
            <Toaster
              position="top-center"
              toastOptions={{
                success: {
                  style: {
                    background: "#10B981",
                    color: "#fff",
                  },
                },
              }}
            />

            {children}
          </body>
        </html>
      </QueryClientProvider>
    </SessionProvider>
  );
}

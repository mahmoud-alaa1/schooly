import type { Metadata } from "next";
import { Alexandria } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import "../Styles/globals.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { attachToken } from "@/services/axios";
import { auth } from "@/lib/auth";
import Loader from "@/components/loader";
const alexandria = Alexandria({
  variable: "--font-alexandria",
  subsets: ["arabic", "latin"],
});

export const metadata: Metadata = {
  title: "Schooly",
  description: "Schooly is a platform for students to learn and grow.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  // @ts-expect-error the token exists
  attachToken(session?.user?.token);
  return (
    <SessionProvider>
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

          <ReactQueryProvider>
            <ReactQueryDevtools initialIsOpen={false} />
            <Loader>{children}</Loader>
          </ReactQueryProvider>
        </body>
      </html>
    </SessionProvider>
  );
}

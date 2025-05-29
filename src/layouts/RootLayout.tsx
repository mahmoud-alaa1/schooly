import { Alexandria } from "next/font/google";
import ClientProviders from "@/providers/ClientProviders";
import { Toaster } from "@/components/ui/sonner";

const alexandria = Alexandria({
  variable: "--font-alexandria",
  subsets: ["latin"],
  display: "auto",
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${alexandria.variable} antialiased`}>
        <ClientProviders>{children}</ClientProviders>
        <Toaster />
      </body>
    </html>
  );
}

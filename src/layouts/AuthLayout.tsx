import Logo from "@/components/Logos/AuthLogo";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex flex-col">
      <header className="flex items-center justify-start">
        <Logo />
      </header>
      <main className="mt-6 flex justify-center">{children}</main>
    </div>
  );
}

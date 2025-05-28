import Logo from "@/components/Logos/AuthLogo";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex flex-col">
      <header className="flex items-center justify-start border-b-2 border-[##02D496] bg-[#B1F2DE] p-6">
        <Logo />
      </header>
      <main className="mt-9 flex justify-center">{children}</main>
    </div>
  );
}

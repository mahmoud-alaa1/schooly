import HomeHeader from "@/components/HomeHeader/HomeHeader";

interface HomeLayoutProps {
  children: React.ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div className="relative min-h-screen overflow-hidden p-4">
      <HomeHeader />
      {children}
    </div>
  );
}

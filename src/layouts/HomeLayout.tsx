import HomeHeader from "@/components/HomeHeader/HomeHeader";

interface HomeLayoutProps {
  children: React.ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* <HomeHeader /> */}
      {children}
    </div>
  );
}

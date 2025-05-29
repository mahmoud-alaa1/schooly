import HomeHeader from "@/components/HomeHeader/HomeHeader";
import SideNav from "@/components/SideNav/SideNav";

interface HomeLayoutProps {
  children: React.ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="grid grid-cols-[clamp(300px,25vw,360px)_auto]">
        <aside className="scrollbar-hide min-h-screen overflow-auto border-l-2 border-[#D9D9D9]">
          <SideNav />
        </aside>
        {children}
      </div>
    </div>
  );
}

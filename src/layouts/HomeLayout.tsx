import HomeHeader from "@/components/HomeHeader/HomeHeader";

interface HomeLayoutProps {
  children: React.ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div className="relative min-h-screen overflow-hidden p-4">
      <HomeHeader />
      <div className="mt-5 grid h-[83vh] grid-cols-[clamp(180px,20vw,210px)_auto_clamp(300px,30vw,360px)] gap-5">
        <aside className="rounded-lg bg-white p-5">asd</aside>
        <main dir="ltr" className="scrollbar-hide overflow-auto">
          {children}
        </main>
        <aside className="rounded-lg bg-white p-5">asd</aside>
      </div>
    </div>
  );
}

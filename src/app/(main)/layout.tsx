import HomeLayout from "@/layouts/HomeLayout";
import { Suspense } from "react";
import Loading from "./loading";
import HomeHeader from "@/components/home-header/HomeHeader";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <HomeLayout>
      <Suspense fallback={<Loading />}>
        <div>
          <HomeHeader />
          {children}
        </div>
      </Suspense>
    </HomeLayout>
  );
}

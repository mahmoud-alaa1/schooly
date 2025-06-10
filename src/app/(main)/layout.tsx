import HomeLayout from "@/layouts/HomeLayout";
import { Suspense } from "react";
import Loading from "./loading";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <HomeLayout>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </HomeLayout>
  );
}

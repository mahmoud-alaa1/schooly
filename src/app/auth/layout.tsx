import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import React from "react";
import { RiGraduationCapLine } from "react-icons/ri";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className=" px-10 py-8 ml-auto flex items-center gap-x-3">
        <RiGraduationCapLine className="text-primary text-6xl" />
        <span className="text-4xl">سكولي</span>
      </header>
      <main>
        <MaxWidthWrapper>{children}</MaxWidthWrapper>
      </main>
      <footer></footer>
    </>
  );
}

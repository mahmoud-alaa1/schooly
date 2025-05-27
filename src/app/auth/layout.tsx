import Logo from "@/components/Logo";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen p-5">
      <header className="flex items-center justify-start">
        <Logo />
      </header>
      <main className="flex mt-6  justify-center">{children}</main>
    </div>
  );
}

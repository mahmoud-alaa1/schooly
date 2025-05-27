import Logo from "@/components/Logos/AuthLogo";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col  ">
      <header className="flex items-center justify-start">
        <Logo />
      </header>
      <main className="flex mt-6  justify-center">{children}</main>
    </div>
  );
}

import Logo from "@/components/Logos/AuthLogo";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <header className="flex items-center justify-start border-b-2 border-[#02D496] bg-[#B1F2DE] p-7">
        <Logo />
      </header>
      <main className="mt-10 flex justify-center">{children}</main>
    </div>
  );
}

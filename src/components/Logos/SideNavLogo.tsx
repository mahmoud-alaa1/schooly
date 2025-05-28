import { GraduationCap } from "lucide-react";
import React from "react";

export default function SideNavLogo() {
  return (
    <div className="flex items-center gap-2 text-xl text-[#017553]">
      <div className="rounded-xl bg-[#01976B] p-2 text-white">
        <GraduationCap size={20} />
      </div>
      <span>سكولي</span>
    </div>
  );
}

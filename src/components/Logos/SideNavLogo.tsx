import { GraduationCap } from "lucide-react";

interface ISideNavLogoProps {
  withTitle?: boolean;
}

export default function SideNavLogo({ withTitle = true }: ISideNavLogoProps) {
  return (
    <div className="flex items-center gap-2 text-xl text-[#017553]">
      <div className="rounded-xl bg-[#01976B] p-2 text-white">
        <GraduationCap size={20} />
      </div>
      {withTitle && <span>سكولي</span>}
    </div>
  );
}

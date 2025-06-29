import SideNavLogo from "../Logos/SideNavLogo";

import Link from "next/link";

import SideNavRoutes from "./SideNavRoutes";
import SideNavClasses from "./SideNavClasses";
import SideNavAccount from "./SideNavAccount";

export default function SideNav({ onClick }: { onClick?: () => void }) {
  return (
    <div className="flex h-full flex-col border-r">
      <div className="border-b-2 border-[#D9D9D9] p-5">
        <Link href="/" onClick={onClick}>
          <SideNavLogo />
        </Link>
      </div>
      <div className="flex flex-col p-5">
        <SideNavRoutes onClick={onClick} />
        <SideNavClasses onClick={onClick} />
      </div>
      <div className="mt-auto p-5">
        <SideNavAccount />
      </div>
    </div>
  );
}

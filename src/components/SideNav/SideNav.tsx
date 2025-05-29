import React from "react";
import SideNavLogo from "../Logos/SideNavLogo";

import Link from "next/link";

import SideNavRoutes from "./SideNavRoutes";
import SideNavClasses from "./SideNavClasses";
import SideNavQrCode from "./SideNavQrCode";
import SideNavAccount from "./SideNavAccount";
import SideNavButton from "./SideNavButton";

export default function SideNav() {
  return (
    <div className="flex h-full flex-col border-r">
      <div className="border-b-2 border-[#D9D9D9] p-5">
        <Link href="/">
          <SideNavLogo />
        </Link>
      </div>
      <div className="flex flex-col p-5">
        <SideNavButton />
        <SideNavRoutes />
        <SideNavClasses />
      </div>
      <div className="mt-auto p-5">
        <SideNavQrCode />
        <SideNavAccount />
      </div>
    </div>
  );
}

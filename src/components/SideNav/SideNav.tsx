import React from "react";
import SideNavLogo from "../Logos/SideNavLogo";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

import SideNavRoutes from "./SideNavRoutes";
import SideNavClasses from "./SideNavClasses";

export default function SideNav() {
  return (
    <div>
      <div className="border-b-2 p-5">
        <Link href="/">
          <SideNavLogo />
        </Link>
      </div>
      <div className="p-5">
        <SideNavRoutes />
        <SideNavClasses />
      </div>
    </div>
  );
}

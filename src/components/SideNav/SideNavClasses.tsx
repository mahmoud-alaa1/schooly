import { Calculator, FlaskConical, Globe } from "lucide-react";
import React from "react";
import NavLink from "../NavLink";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
const links: {
  title: string;
  href: string;
  icon: React.ReactNode;
  color: string;
}[] = [
  {
    title: "دراسات اجتماعية",
    href: "/social-studies",
    icon: <Globe size={16} />,
    color: "#CF5A77",
  },
  {
    title: "علوم",
    href: "/science",
    icon: <FlaskConical size={16} />,
    color: "#A4CE42",
  },
  {
    title: "لغة عربية",
    href: "/arabic",
    icon: (
      <span className="flex size-2 items-center justify-center p-2">ض</span>
    ),
    color: "#978208",
  },
  {
    title: "رياضيات",
    href: "/math",
    icon: <Calculator size={16} />,
    color: "#899FE7",
  },
  {
    title: "لغة إنجليزية",
    href: "/english",
    icon: (
      <span className="flex size-2 items-center justify-center p-2">A</span>
    ),
    color: "#864C8C",
  },
];
export default function SideNavClasses() {
  return (
    <div className="mt-4">
      <div className="border-b-2 pr-3 pb-3 text-sm font-bold">
        فصولي الدراسية
      </div>
      <ul className="flex flex-col">
        {links.map((link) => (
          <li key={link.title}>
            <NavLink
              href={link.href}
              className="flex w-full items-center gap-2 rounded-lg p-3"
              nonActiveClassName="bg-white hover:bg-gray-100"
              activeClassName="bg-[#B5F3E0] text-[#017553]"
            >
              <Badge
                style={{ backgroundColor: link.color }}
                variant="secondary"
                className={cn(`rounded-full p-2 text-white`)}
              >
                {link.icon}
              </Badge>
              {link.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

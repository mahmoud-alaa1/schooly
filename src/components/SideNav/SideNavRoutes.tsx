import { Home, Settings, Sheet, Table, Users } from "lucide-react";
import { Badge } from "../ui/badge";
import React from "react";
import NavLink from "../NavLink";
import { cn } from "@/lib/utils";
const links: {
  title: string;
  href: string;
  icon: React.ReactNode;
  color: string;
}[] = [
  {
    title: "أخر المنشورات",
    href: "/",
    icon: <Home />,
    color: "#899FE7",
  },
  {
    title: "الجدول",
    href: "/lessons-table",
    icon: <Table />,
    color: "#EA7EAD",
  },
  {
    title: "الواجبات",
    href: "/homeworks",
    icon: <Sheet />,
    color: "#B7C35E",
  },
  {
    title: "الطلاب",
    href: "/students",
    icon: <Users />,
    color: "#34B428",
  },
  {
    title: "حسابي",
    href: "/account",
    icon: <Settings />,
    color: "#BAB8BA",
  },
];

export default function SideNavRoutes() {
  return (
    <ul className="mt-4 flex flex-col">
      {links.map((link) => (
        <li key={link.title}>
          <NavLink
            href={link.href}
            className="flex w-full items-center gap-2 rounded-lg p-1 text-sm text-[#00000073]"
            nonActiveClassName="bg-transparent hover:bg-white"
            activeClassName="bg-[#B5F3E0] text-[#017553] font-semibold"
          >
            <Badge
              style={{ backgroundColor: link.color }}
              variant="secondary"
              className={cn(`p-1 text-white`)}
            >
              {link.icon}
            </Badge>
            {link.title}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

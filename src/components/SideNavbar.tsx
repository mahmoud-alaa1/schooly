"use client";

import { AiOutlineHome } from "react-icons/ai";
import { ImTable2 } from "react-icons/im";
import { LuBookMarked } from "react-icons/lu";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { MdOutlineSettings } from "react-icons/md";

import NavLink from "./ui/NavLink";

const links: {
  title: string;
  href: string;
  icon: React.ReactNode;
}[] = [
  {
    title: "الرئيسية",
    href: "/home",
    icon: <AiOutlineHome className="text-2xl" />,
  },
  {
    title: "الجدول",
    href: "/",
    icon: <ImTable2 className="text-2xl" />,
  },
  {
    title: "الفصول",
    href: "/",
    icon: <LuBookMarked className="text-2xl" />,
  },
  {
    title: "الطلاب",
    href: "/",
    icon: <AiOutlineUsergroupAdd className="text-2xl" />,
  },
  {
    title: "الإعدادات",
    href: "/",
    icon: <MdOutlineSettings className="text-2xl" />,
  },
];

export default function SideNavbar() {
  return (
    <aside className="bg-[#FFFFFF] rounded-2xl border border-[#D9D9D9] p-4 max-h-96">
      <nav>
        <ul className="flex flex-col gap-2">
          {links.map((link) => (
            <li key={link.title}>
              <NavLink
                href={link.href}
                activeClassName="text-[#02C189] bg-[#F5F5F5] rounded-2xl"
                nonActiveClassName="text-gray-500"
                className="flex items-center gap-2 p-2"
              >
                {link.icon}
                {link.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

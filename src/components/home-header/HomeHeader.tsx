"use client";
import { usePathname } from "next/navigation";
import LogoutButton from "../LogoutButton";
import { cn } from "@/lib/utils";

function textHeader(pathname: string) {
  switch (pathname) {
    case "homeworks":
      return "الواجبات";
    case "students":
      return "الطلاب";
    case "teachers":
      return "المعلمين";
    case "classrooms":
      return "الفصول الدراسية";
    case "account":
      return "حسابي";
    default:
      return "اخر المنشورات";
  }
}

export default function HomeHeader({ className }: { className?: string }) {
  const pathname = usePathname();
  return (
    <header
      className={cn("border-b-2 border-[#D9D9D9] bg-[#F5F5F5]", className)}
    >
      <div className="flex items-center justify-between p-5 text-lg">
        <span className="font-semibold text-[#01976B]">
          {textHeader(pathname.split("/")[1])}
        </span>
        <LogoutButton />
      </div>
    </header>
  );
}

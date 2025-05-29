import LogoutButton from "../LogoutButton";
import UserHeader from "./UserHeader";
import { cn } from "@/lib/utils";

export default function HomeHeader({ className }: { className?: string }) {
  return (
    <header
      className={cn("border-b-2 border-[#D9D9D9] bg-[#F5F5F5]", className)}
    >
      <div className="flex items-center justify-between p-5 text-lg">
        <span className="font-semibold text-[#01976B]">اخر المنشورات</span>
        <LogoutButton />
      </div>
    </header>
  );
}

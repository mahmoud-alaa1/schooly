import HomeLogo from "../Logos/HomeLogo";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import LogoutButton from "../LogoutButton";
import UserHeader from "./UserHeader";
import MobileMenu from "./MobileMenu";
import { cn } from "@/lib/utils";

export default function HomeHeader({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        "z-10 flex items-center justify-between gap-2 rounded-lg bg-white",
        className,
      )}
    >
      <HomeLogo />
      <div className="p-6 text-lg">
        <MobileMenu />
        <div className="hidden items-center gap-6 sm:flex">
          <Button className="rounded-xl px-6! py-4">
            <span>حصة جديدة</span>
            <Plus />
          </Button>
          <UserHeader />
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}

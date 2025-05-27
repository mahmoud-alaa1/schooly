import HomeLogo from "../Logos/HomeLogo";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import LogoutButton from "../LogoutButton";
import UserHeader from "./UserHeader";

export default function HomeHeader() {
  return (
    <header className="bg-white items-center gap-2 rounded-lg flex justify-between">
      <HomeLogo />
      <div className="p-6 text-lg flex gap-6 items-center">
        <Button className="px-6! rounded-xl py-4">
          <span>حصة جديدة</span>
          <Plus />
        </Button>
        <UserHeader />
        <LogoutButton />
      </div>
    </header>
  );
}

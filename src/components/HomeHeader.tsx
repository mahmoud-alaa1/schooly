import React from "react";
import HomeLogo from "./Logos/HomeLogo";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import Avatar from "./Avatar";
import LogoutButton from "./LogoutButton";

export default function HomeHeader() {
  return (
    <header className="bg-white items-center gap-2 rounded-lg flex justify-between">
      <HomeLogo />
      <div className="p-6 text-lg flex gap-6 items-center">
        <Button className="px-6! rounded-xl py-4">
          <span>حصة جديدة</span>
          <Plus />
        </Button>
        <div className="flex gap-2 items-center">
          <Avatar />
          <span>أيمن أحمد</span>
        </div>
        <LogoutButton />
      </div>
    </header>
  );
}

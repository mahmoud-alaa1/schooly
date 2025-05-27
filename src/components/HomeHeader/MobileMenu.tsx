import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { Menu, Plus } from "lucide-react";
import UserHeader from "./UserHeader";
import LogoutButton from "../LogoutButton";

export default function MobileMenu() {
  return (
    <div className="sm:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="gap-5 bg-white p-5">
          <SheetHeader className="sr-only">
            <SheetTitle>Side Menu</SheetTitle>
          </SheetHeader>
          <div className="flex items-center justify-between">
            <UserHeader />
            <LogoutButton />
          </div>
          <Button className="rounded-xl px-6! py-4">
            <span>حصة جديدة</span>
            <Plus />
          </Button>
        </SheetContent>
      </Sheet>
    </div>
  );
}

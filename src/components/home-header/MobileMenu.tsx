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
import UpcomingLessonsList from "../upcoming-lessons/UpcomingLessonsList";
import HomeworksList from "../Homeworks/HomeworksList";

export default function MobileMenu() {
  return (
    <div className="xl:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="gap-5 overflow-auto bg-white p-5">
          <SheetHeader className="sr-only">
            <SheetTitle>Side Menu</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-5 sm:hidden">
            <div className="flex items-center justify-between">
              <UserHeader />
              <LogoutButton />
            </div>
            <Button className="w-full rounded-xl px-6! py-4">
              <span>حصة جديدة</span>
              <Plus />
            </Button>
          </div>
          <div className="flex flex-col gap-5 xl:hidden">
            <UpcomingLessonsList />
            <HomeworksList />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import SideNavLogo from "../Logos/SideNavLogo";
import SideNav from "./SideNav";

export default function SideNavMenu() {
  return (
    <div className="fixed top-1/4 right-0 z-50 xl:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" className="p-0 hover:bg-transparent">
            <SideNavLogo withTitle={false} />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="scrollbar-hide w-[300px] gap-5 overflow-auto bg-white"
        >
          <SheetTitle className="sr-only">القائمة الجانبية</SheetTitle>
          <SheetDescription className="sr-only">
            قائمة تحتوي على روابط التنقل الرئيسية للتطبيق
          </SheetDescription>
          <SideNav />
        </SheetContent>
      </Sheet>
    </div>
  );
}

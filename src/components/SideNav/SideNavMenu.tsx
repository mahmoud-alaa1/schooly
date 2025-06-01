import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "../ui/button";
import SideNavLogo from "../Logos/SideNavLogo";
import SideNav from "./SideNav";

export default function SideNavMenu() {
  return (
    <div className="fixed top-1/4 right-0 z-10 xl:hidden">
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
          <SideNav />
        </SheetContent>
      </Sheet>
    </div>
  );
}

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "../ui/button";
import SideNavLogo from "../Logos/SideNavLogo";
import SideNav from "./SideNav";

export default function SideNavMenu() {
  return (
    <div className="fixed top-1/4 right-0 z-10 lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" className="p-0">
            <SideNavLogo withTitle={false} />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="scrollbar-hide gap-5 overflow-auto bg-white"
        >
          <SideNav />
        </SheetContent>
      </Sheet>
    </div>
  );
}

import { ArrowDownUp } from "lucide-react";
import UserHeader from "../home-header/UserHeader";

function SideNavAccount() {
  return (
    <div className="mt-5 flex items-center justify-between rounded-lg border-2 border-[#35DDAB] bg-[#B1F2DE] px-4 py-2">
      <UserHeader />
    </div>
  );
}

export default SideNavAccount;

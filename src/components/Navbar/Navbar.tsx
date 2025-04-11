import { RiGraduationCapLine } from "react-icons/ri";
import { Button } from "../ui/button";
import { FaPlus } from "react-icons/fa";
import { FaRegBell } from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";

import UserAvatar from "../ui/userAvatar";
import SignoutButton from "../SignoutButton";
import { cn } from "@/lib/utils";

export default function Navbar({ className }: { className?: string }) {
  return (
    <header className={cn(className)}>
      <nav className="h-[72px] bg-[#FFFFFF] rounded-2xl flex justify-between pl-4">
        <div className="flex items-center  rounded-tr-[inherit] rounded-br-[inherit] bg-[#02D496] h-full px-6">
          <RiGraduationCapLine className=" text-4xl text-[#E6FBF5]" />
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <Button className="bg-[#02D496] text-md rounded-xl px-4 hover:bg-[#30b58d] transition active:scale-95">
              حصة جديدة <FaPlus className="text-[##FFFFFF]" />
            </Button>
          </div>
          <ul className="flex items-center">
            <li className="flex items-center gap-1 px-3">
              <UserAvatar avatar={5} size={30}></UserAvatar>
              <span>أيمن أحمد</span>
            </li>

            <li className="p-1">
              <Button variant="ghost" size="icon" className="pr-2.5">
                <div className="relative inline-block">
                  <AiOutlineMessage className="text-xl relative" />
                  <span className="absolute -top-0 -right-3 bg-red-500 text-white text-xs font-bold rounded-full size-5  flex items-center justify-center ">
                    2
                  </span>
                </div>
              </Button>
            </li>
            <li className="p-1">
              <div className="inline-block">
                <SignoutButton />
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

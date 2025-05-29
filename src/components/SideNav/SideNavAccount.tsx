import { ArrowDownUp } from "lucide-react"
import UserHeader from "../HomeHeader/UserHeader"

function SideNavAccount() {
  return (
    <div className="border-2 border-[#35DDAB] bg-[#B1F2DE] mt-5 py-2 px-4 rounded-lg flex justify-between items-center">
        <UserHeader/>
        <ArrowDownUp className="text-[#02C189] "/>
    </div>
  )
}

export default SideNavAccount
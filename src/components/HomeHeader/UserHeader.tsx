"use client";
import Avatar from "../Avatar";
import { useAuth } from "@/store/auth";

export default function UserHeader() {
  const user = useAuth((state) => state.user);

  return (
    <div className="flex gap-2 h-full items-center">
      <Avatar src={'/person1.png'} alt="person" size="12" />
      <div className="flex flex-col justify-center">
        <span>{user?.name}</span>
        <span className="text-[#00000073] text-sm">{user?.role === 2 ? 'حساب طالب' : "حساب معلم" }</span>  
      </div>
    </div>
  );
}

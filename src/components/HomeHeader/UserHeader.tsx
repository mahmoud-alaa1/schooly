"use client";
import Avatar from "../Avatar";
import { useAuth } from "@/store/auth";

export default function UserHeader() {
  const user = useAuth((state) => state.user);

  return (
    <div className="flex gap-2 h-full items-center">
      <Avatar  />
      <div className="flex flex-col justify-center">
        <span>{user?.name}</span>
        <span className="text-[#00000073]">{user?.role === 2 ? 'حساب طالب' : "حساب معلم" }</span>  
      </div>
    </div>
  );
}

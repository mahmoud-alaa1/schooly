"use client";
import { EROLES } from "@/types/roles";
import Avatar from "../Avatar";
import { useAuth } from "@/store/auth";

export default function UserHeader() {
  const user = useAuth((state) => state.user);
  return (
    <div className="flex h-full items-center gap-2">
      <Avatar
        src={"/person1.png"}
        alt="person"
        size="12"
        className="border-2 border-white"
      />
      <div className="flex flex-col justify-center">
        <span>{user?.name}</span>
        <span className="text-sm text-[#00000073]">
          {user?.role === EROLES.STUDENT ? "حساب طالب" : "حساب معلم"}
        </span>
      </div>
    </div>
  );
}

"use client";
import { EROLES } from "@/types/enums";
import useGetProfile from "@/hooks/profile/useGetProfile";
import UserAvatar from "../UserAvatar";
import { useAuth } from "@/store/auth";

export default function UserHeader() {
  const user = useAuth((state) => state.user);

  return (
    <div className="flex h-full items-center gap-2">
      <UserAvatar alt="person" size={48} />
      <div className="flex flex-col justify-center">
        <span>{user?.name}</span>
        <span className="text-sm text-[#00000073]">
          {user?.role === EROLES.STUDENT ? "حساب طالب" : "حساب معلم"}
        </span>
      </div>
    </div>
  );
}

"use client";
import { EROLES } from "@/types/enums";
import useGetProfile from "@/hooks/profile/useGetProfile";
import UserAvatar from "../UserAvatar";

export default function UserHeader() {
  const { data } = useGetProfile();

  return (
    <div className="flex h-full items-center gap-2">
      <UserAvatar alt="person" size={48} />
      <div className="flex flex-col justify-center">
        <span className="text-sm">{data?.data.name}</span>
        <span className="text-sm text-[#00000073]">
          {data?.data?.role === EROLES.STUDENT ? "حساب طالب" : "حساب معلم"}
        </span>
      </div>
    </div>
  );
}

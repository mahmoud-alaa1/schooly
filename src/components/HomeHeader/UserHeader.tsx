"use client";
import Avatar from "../Avatar";
import { useAuth } from "@/store/auth";

export default function UserHeader() {
  const user = useAuth((state) => state.user);

  return (
    <div className="flex gap-2 h-full items-center">
      <Avatar />
      <span>{user?.name}</span>
    </div>
  );
}

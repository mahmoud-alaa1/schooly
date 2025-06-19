"use client";
import useGetProfile from "@/hooks/profile/useGetProfile";
import Image from "next/image";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface AvatarProps {
  alt?: string;
  size?: number;
  bgColor?: string;
  className?: string;
}

export default function UserAvatar({ size = 28, className = "" }: AvatarProps) {
  const user = useGetProfile();

  if (user.isLoading || user.isPending) {
    return (
      <Skeleton
        className={`rounded-full border-2 border-white bg-neutral-50 ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-full border-2 border-white bg-neutral-50 ${className}`}
      style={{ width: size, height: size }}
    >
      {user?.data?.data.profilePictureUrl ? (
        <Image
          className="h-full w-full rounded-full object-cover"
          src={
            process.env.NEXT_PUBLIC_API_URL! +
            "/upload/" +
            user?.data?.data.profilePictureUrl
          }
          alt="User Profile Picture"
          width={size}
          height={size}
          priority
        />
      ) : (
        <Image
          className={`absolute right-0 left-0 h-auto w-full rounded-full object-cover ${
            user.data?.data.gender === 0 ? "bg-orange-300" : "bg-pink-300"
          }`}
          src={
            user.data?.data.gender === 0
              ? "/assets/default-boy.webp"
              : "/assets/default-girl.webp"
          }
          alt="User Default Profile Picture"
          width={size}
          height={size}
        />
      )}
    </div>
  );
}

"use client";
import useGetProfile from "@/hooks/profile/useGetProfile";
import { useAuth } from "@/store/auth";
import Image from "next/image";
import React from "react";

interface AvatarProps {
  alt?: string;
  size?: number;
  bgColor?: string;
  className?: string;
  src?: string;
}

export default function Avatar({
  size = 28,
  className = "",
  src,
}: AvatarProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-full border-2 border-white bg-neutral-50 ${className}`}
      style={{ width: size, height: size }}
    >
      {src ? (
        <Image
          className="h-full w-full rounded-full object-cover"
          src={process.env.NEXT_PUBLIC_API_URL! + "/upload/" + src}
          alt="User Profile Picture"
          width={size}
          height={size}
          priority
        />
      ) : (
        <Image
          className={`absolute right-0 left-0 h-auto w-full rounded-full bg-orange-300 object-cover`}
          src={"/assets/default-boy.webp"}
          alt="User Profile Picture"
          width={size}
          height={size}
        />
      )}
    </div>
  );
}

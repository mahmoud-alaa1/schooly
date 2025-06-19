"use client";
import Image from "next/image";
import { useAuth } from "@/store/auth";
import { Skeleton } from "@/components/ui/skeleton";

interface AvatarProps {
  alt?: string;
  size?: number;
  bgColor?: string;
  className?: string;
}

export default function UserAvatar({ size = 28, className = "" }: AvatarProps) {
  const user = useAuth((state) => state.user);

  return (
    <div
      className={`relative overflow-hidden rounded-full border-2 border-white bg-neutral-50 ${className}`}
      style={{ width: size, height: size }}
    >
      {user?.profilePictureUrl ? (
        <Image
          className="h-full w-full rounded-full object-cover"
          src={
            process.env.NEXT_PUBLIC_API_URL! +
            "/upload/" +
            user?.profilePictureUrl
          }
          alt="User Profile Picture"
          width={size}
          height={size}
          priority
        />
      ) : (
        <Image
          className={`absolute right-0 left-0 h-auto w-full rounded-full object-cover ${
            user?.gender === 0 ? "bg-orange-300" : "bg-pink-300"
          }`}
          src={
            user?.gender === 0
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

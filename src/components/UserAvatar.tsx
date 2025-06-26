"use client";
import Image from "next/image";
import { useAuth } from "@/store/auth";
import { Skeleton } from "@/components/ui/skeleton";
import useGetProfile from "@/hooks/profile/useGetProfile";

interface AvatarProps {
  alt?: string;
  size?: number;
  bgColor?: string;
  className?: string;
}

export default function UserAvatar({ size = 28, className = "" }: AvatarProps) {
  const { isPending, data } = useGetProfile();

  const user = data?.data;
  if (!user || isPending) {
    return (
      <Skeleton
        className={`rounded-full ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }

  console.log(data.data.profilePictureUrl);

  const imageSrc = user.profilePictureUrl
    ? user.profilePictureUrl
    : user.gender === 0
      ? "/assets/default-boy.webp"
      : "/assets/default-girl.webp";

  return (
    <div
      className={`relative overflow-hidden rounded-full border-2 border-white bg-neutral-50 ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        className="h-full w-full rounded-full object-cover"
        src={imageSrc}
        alt="User Profile Picture"
        width={size}
        height={size}
        priority
      />
    </div>
  );
}

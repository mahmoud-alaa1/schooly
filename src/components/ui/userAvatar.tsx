import { cn } from "@/lib/utils";
import Image from "next/image";
export default function UserAvatar({
  size,
  avatar,
  bgColor,
  className,
}: {
  size: number;
  avatar: number;
  bgColor?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        `${
          bgColor ? `bg-[${bgColor}]` : "bg-[#FEC334]"
        } rounded-full flex items-center justify-center overflow-hidden relative`,
        className
      )}
      style={{ width: size, height: size }}
    >
      <Image
        alt="User Avatar"
        width={size}
        height={size}
        src={`/user-${avatar}.png`}
      />
    </div>
  );
}

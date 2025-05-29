import Image from "next/image";
import React from "react";

interface AvatarProps {
  src: string;
  alt?: string;
  size?: string;
  bgColor?: string;
  className?: string;
}

export default function Avatar({ 
  src, 
  alt = "Avatar", 
  size = "size-10", 
  bgColor = "bg-orange-300",
  className = ""
}: AvatarProps) {
  return (
    <div className={`${size} ${bgColor} rounded-full overflow-hidden ${className}`}>
      <Image 
        className="w-full h-full object-cover" 
        src={src} 
        alt={alt} 
        width={40}
        height={40}
      />
    </div>
  );
}
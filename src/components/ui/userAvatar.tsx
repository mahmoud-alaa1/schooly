import Image from "next/image";
export default function UserAvatar({ size }: { size: number }) {
  return (
    <div className="bg-[#FEC334] rounded-full flex items-center">
      <Image alt="User Avatar" width={size} height={size} src="/User.png" />
    </div>
  );
}

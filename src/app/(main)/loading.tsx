import { GraduationCap } from "lucide-react";

export default function Loading() {
  return (
    <div className="z-50 flex items-center justify-center bg-white">
      <div className="relative">
        <span className="absolute inset-0 animate-ping rounded-full border border-gray-400" />
        <span className="absolute inset-0 animate-ping rounded-full border border-gray-400 delay-200" />
        <span className="absolute inset-0 animate-ping rounded-full border border-gray-400 delay-400" />
        <div className="rounded-full bg-[#02D496] p-6">
          <GraduationCap className="text-primary bg-primary size-11" />
        </div>
      </div>
    </div>
  );
}

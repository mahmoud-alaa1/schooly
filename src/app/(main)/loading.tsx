import { GraduationCap } from "lucide-react";

export default function Loading() {
  return (
    <div className="z-50 flex h-screen items-center justify-center bg-neutral-100">
      <div className="relative">
        <span className="border-primary absolute inset-0 animate-ping rounded-full border duration-1000" />

        <div className="rounded-full bg-[#02D496] p-6">
          <GraduationCap className="bg-primary size-11 text-white" />
        </div>
      </div>
    </div>
  );
}

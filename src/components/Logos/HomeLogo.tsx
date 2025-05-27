import { cn } from "@/lib/utils";
import { GraduationCap } from "lucide-react";

export default function HomeLogo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "bg-primary flex items-center justify-center self-stretch rounded-[inherit] rounded-l-none p-6 text-white",
        className,
      )}
    >
      <GraduationCap className="size-8" />
    </div>
  );
}

import { Badge } from "@/components/ui/badge";
import {  Volume2, VolumeX } from "lucide-react";

export default function NameBadge({
  name,
  audio,
}: {
  name: string;
  audio: boolean;
}) {
  return (
    <Badge className="absolute top-2 left-2 gap-2 bg-black/35 text-xs text-white">
      {audio ? (
        <VolumeX className="text- h-4 w-4" />
      ) : (
        <Volume2 className="size-4" />
      )}
      <span>{name}</span>
    </Badge>
  );
}

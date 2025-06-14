"use client";
import { Badge } from "@/components/ui/badge";
import { MESSAGES } from "@/lib/constants";

const LiveBadge = () => (
  <Badge
    variant="destructive"
    className="h-fit w-fit rounded-full border-none bg-red-500 text-white"
  >
    <span className="px-2 py-1 text-sm">{MESSAGES.LIVE_BADGE}</span>
  </Badge>
);

export default LiveBadge;

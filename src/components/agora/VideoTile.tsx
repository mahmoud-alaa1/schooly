"use client";

import { motion } from "framer-motion";
import { Mic, MicOff, Video, VideoOff, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef, useEffect } from "react";
import Avatar from "@/components/Avatar";
import { ICameraVideoTrack, IRemoteVideoTrack } from "agora-rtc-react";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

interface VideoTileProps {
  uid?: string | number;
  videoTrack?: IRemoteVideoTrack | ICameraVideoTrack | null;
  hasVideo: boolean;
  hasAudio: boolean;
  isLocal?: boolean;
  muted?: boolean;
  onToggleMic?: () => void;
  onToggleCamera?: () => void;
}

export default function VideoTile({
  uid,
  videoTrack,
  hasVideo,
  hasAudio,
  isLocal = false,
  muted = false,
  onToggleMic,
  onToggleCamera,
}: VideoTileProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hasVideo && videoTrack && containerRef.current) {
      try {
        videoTrack.play(containerRef.current);
        return () => videoTrack.stop();
      } catch (error) {
        console.error(`Error playing track for user ${uid}:`, error);
      }
    }
  }, [videoTrack, uid, hasVideo]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -20 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ scale: 1.02 }}
      className={cn(
        "relative h-full w-full overflow-hidden rounded-lg",
        hasAudio && "border-2 border-red-500",
      )}
      key={hasVideo ? `video-${uid}` : `avatar-${uid}`}
    >
      {hasVideo ? (
        <div
          ref={containerRef}
          className="h-full w-full rounded-lg object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded-lg bg-white/50">
          <Avatar
            src="/person1.png"
            className="ring-background size-24 ring-2"
          />
        </div>
      )}

      <Badge className="absolute top-2 left-2 gap-2 bg-black/35 text-xs text-white">
        {muted || !hasAudio ? (
          <VolumeX className="text- h-4 w-4" />
        ) : (
          <Volume2 className="size-4" />
        )}
        <span>{isLocal ? "You" : `User ${uid}`}</span>
      </Badge>

      {isLocal && (
        <div className="absolute bottom-2 left-2 flex items-center gap-2 rounded-full bg-black/35 px-3 py-1">
          <Button
            size="icon"
            variant="ghost"
            onClick={onToggleMic}
            className="size-7! hover:bg-white/20"
          >
            {hasAudio ? (
              <Mic className="h-4 w-4 text-white" />
            ) : (
              <MicOff className="h-4 w-4 text-white" />
            )}
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={onToggleCamera}
            className="size-7! hover:bg-white/20"
          >
            {hasVideo ? (
              <Video className="h-4 w-4 text-white" />
            ) : (
              <VideoOff className="h-4 w-4 text-white" />
            )}
          </Button>
        </div>
      )}
    </motion.div>
  );
}

"use client";

import { motion } from "framer-motion";
import { useRef, useEffect, use } from "react";
import { ICameraVideoTrack, IRemoteVideoTrack } from "agora-rtc-react";
import { cn } from "@/lib/utils";
import NameBadge from "./NameBadge";
import LocalControls from "./LocalControls";
import VideoOrAvatar from "./VideoOrAvatar";
import useGetInfo from "@/hooks/users/useGetInfo";

interface VideoTileProps {
  uid: string;
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
  const { data } = useGetInfo(uid);

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ scale: 1.02 }}
      className={cn("relative h-full w-full overflow-hidden rounded-lg")}
      key={hasVideo ? `video-${uid}` : `avatar-${uid}`}
    >
      {hasVideo ? (
        <VideoOrAvatar
          isLocal={isLocal}
          videoTrack={videoTrack}
          hasVideo={hasVideo}
        />
      ) : (
        <VideoOrAvatar
          picture={data?.data.profilePictureUrl}
          isLocal={isLocal}
          hasVideo={hasVideo}
        />
      )}

      <NameBadge
        name={isLocal ? "You" : data?.data.name?? "loading.."}
        audio={muted || !hasAudio}
      />

      {isLocal && (
        <LocalControls
          hasAudio={hasAudio}
          hasVideo={hasVideo}
          onToggleMic={onToggleMic}
          onToggleCamera={onToggleCamera}
        />
      )}
    </motion.div>
  );
}

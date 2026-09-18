import React, { useRef, useEffect } from "react";
import Avatar from "@/components/Avatar";
import UserAvatar from "@/components/UserAvatar";
import { ICameraVideoTrack, IRemoteVideoTrack } from "agora-rtc-react";

interface VideoOrAvatarProps {
  isLocal: boolean;
  picture?: string;
  videoTrack?: IRemoteVideoTrack | ICameraVideoTrack | null;
  hasVideo: boolean;
}

const VideoOrAvatar: React.FC<VideoOrAvatarProps> = ({
  isLocal,
  picture = "",
  videoTrack,
  hasVideo,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hasVideo && videoTrack && containerRef.current) {
      try {
        videoTrack.play(containerRef.current);
        return () => videoTrack.stop();
      } catch (error) {
        // Optionally handle error
        console.log("Error playing video track:", error);
      }
    }
  }, [videoTrack, hasVideo]);

  if (hasVideo) {
    return (
      <div
        ref={containerRef}
        className="h-full w-full rounded-lg object-cover"
      />
    );
  }
  return (
    <div className="flex h-full w-full items-center justify-center rounded-lg bg-white/50">
      {!isLocal ? <Avatar src={picture} size={96} /> : <UserAvatar size={96} />}
    </div>
  );
};

export default VideoOrAvatar;

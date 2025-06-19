import { Button } from "@/components/ui/button";
import { Mic, MicOff, Video, VideoOff } from "lucide-react";
import React from "react";

interface LocalControlsProps {
  hasAudio: boolean;
  hasVideo: boolean;
  onToggleMic?: () => void;
  onToggleCamera?: () => void;
}

const LocalControls: React.FC<LocalControlsProps> = ({
  hasAudio,
  hasVideo,
  onToggleMic,
  onToggleCamera,
}) => (
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
);

export default LocalControls;

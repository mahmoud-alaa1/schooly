import { Button } from "../ui/button";
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Video,
  VideoOff,
  PhoneOff,
  Maximize2,
  Minimize2,
} from "lucide-react";

import { AnimatedButton } from "./AnimatedButton";
import useLeaveLesson from "@/hooks/lessons/useLeaveLesson";

interface VideoToolbarProps {
  micOn: boolean;
  toggleMic: () => void;
  cameraOn: boolean;
  toggleCamera: () => void;
  audioOn: boolean;
  setAudio: (value: boolean) => void;
  isFullscreen: boolean;
  toggleFullscreen: () => void;
  setActiveConnection: (value: boolean) => void;
}

export const VideoToolbar = ({
  micOn,
  toggleMic,
  cameraOn,
  toggleCamera,
  audioOn,
  setAudio,
  isFullscreen,
  toggleFullscreen,
  setActiveConnection,
}: VideoToolbarProps) => {
  const { mutate } = useLeaveLesson();

  return (
    <div
      className="mt-3 flex flex-wrap items-center justify-center gap-3"
      dir="ltr"
    >
      <AnimatedButton
        isActive={micOn}
        onClick={toggleMic}
        activeIcon={Mic}
        inactiveIcon={MicOff}
      />
      <AnimatedButton
        isActive={cameraOn}
        onClick={toggleCamera}
        activeIcon={Video}
        inactiveIcon={VideoOff}
      />
      <Button
        className="bg-red-500 px-10 hover:bg-red-600 active:scale-95"
        onClick={() => {
          setActiveConnection(false);
          mutate();
        }}
      >
        <PhoneOff className="h-5 w-5" />
      </Button>
      <AnimatedButton
        isActive={audioOn}
        onClick={() => setAudio(!audioOn)}
        activeIcon={Volume2}
        inactiveIcon={VolumeX}
      />

      <AnimatedButton
        isActive={isFullscreen}
        onClick={toggleFullscreen}
        activeIcon={Minimize2}
        inactiveIcon={Maximize2}
      />
    </div>
  );
};

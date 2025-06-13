"use client";

import {
  useJoin,
  useRemoteAudioTracks,
  useRemoteUsers,
  usePublish,
} from "agora-rtc-react";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useFullscreen } from "@/hooks/useFullscreen";
import { useMicrophone } from "@/hooks/useMicrophone";
import { useCamera } from "@/hooks/useCamera";
import { VideoToolbar } from "./VideoToolbar";
import { motion, AnimatePresence } from "framer-motion";
import { Minimize } from "lucide-react";
import { Button } from "../ui/button";
import VideoTile from "./VideoTile";
import { useAuth } from "@/store/auth";

export const LiveVideo = () => {
  const [activeConnection, setActiveConnection] = useState(true);
  const {
    isEnabled: micOn,
    toggle: toggleMic,
    track: localMicrophoneTrack,
  } = useMicrophone();
  const {
    isEnabled: cameraOn,
    toggle: toggleCamera,
    track: localCameraTrack,
  } = useCamera();
  const [audioOn, setAudio] = useState(true);
  const {
    isFullscreen,
    toggleFullscreen,
    ref: videoContainerRef,
  } = useFullscreen<HTMLDivElement>();

  const { lessonId } = useParams();

  const remoteUsers = useRemoteUsers();
  const { audioTracks } = useRemoteAudioTracks(remoteUsers);

  useEffect(() => {
    audioTracks.forEach((track) => {
      try {
        if (audioOn) {
          track.play();
        } else {
          track.stop();
        }
      } catch (error) {
        console.error("Error playing audio track:", error);
      }
    });
  }, [audioTracks, audioOn]);

  const id = useAuth((state) => state.user?.id);

  useJoin(
    {
      appid: process.env.NEXT_PUBLIC_AGORA_APP_ID!,
      token: localStorage.getItem("agora-token") || "",
      channel: lessonId as string,
      uid: id,
    },
    activeConnection,
  );

  usePublish([localMicrophoneTrack, localCameraTrack]);

  console.log(remoteUsers.length, "remote users length");

  return (
    <div className="flex w-full grow flex-col justify-between p-1">
      <div
        ref={videoContainerRef}
        className={`from-primary to-primary/30 relative grid flex-1 gap-4 rounded-xl bg-gradient-to-b p-4 shadow-2xl transition-all duration-300 ease-in-out`}
        style={{
          gridTemplateColumns:
            remoteUsers.length === 0
              ? "1fr"
              : remoteUsers.length === 1
                ? "repeat(2, 1fr)"
                : "repeat(2, 1fr)",
          gridTemplateRows:
            remoteUsers.length === 0
              ? "1fr"
              : remoteUsers.length === 1
                ? "1fr"
                : "repeat(2, 1fr)",
        }}
      >
        <VideoTile
          uid="local"
          track={localCameraTrack}
          hasVideo={cameraOn}
          hasAudio={micOn}
          isLocal={true}
          muted={!micOn}
          onToggleMic={toggleMic}
          onToggleCamera={toggleCamera}
        />
        <AnimatePresence mode="popLayout">
          {remoteUsers.slice(0, 3).map((user) => {
            return (
              <VideoTile
                key={user.uid}
                uid={user.uid}
                track={user.videoTrack}
                hasVideo={user.hasVideo}
                hasAudio={user.hasAudio}
              />
            );
          })}
          {remoteUsers.length > 3 && (
            <motion.button
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{
                opacity: 0,
                scale: 0.8,
                transition: {
                  duration: 0.3,
                  ease: [0.4, 0, 0.2, 1],
                },
              }}
              transition={{
                layout: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
                duration: 0.4,
                ease: [0.4, 0, 0.2, 1],
                scale: { duration: 0.3 },
                opacity: { duration: 0.3 },
              }}
              whileHover={{ scale: 1.1 }}
              className="bg-primary hover:bg-primary/90 absolute right-4 bottom-4 flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg"
              onClick={() => {
                // TODO: Implement show more users functionality
              }}
            >
              <span className="text-xl font-bold">
                +{remoteUsers.length - 3}
              </span>
            </motion.button>
          )}
        </AnimatePresence>
        {isFullscreen && (
          <Button className="absolute top-4 right-4 size-10 text-white shadow-lg">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1],
              }}
              whileHover={{ scale: 1.1 }}
              onClick={toggleFullscreen}
            >
              <Minimize />
            </motion.div>
          </Button>
        )}
      </div>

      <VideoToolbar
        micOn={micOn}
        toggleMic={toggleMic}
        cameraOn={cameraOn}
        toggleCamera={toggleCamera}
        audioOn={audioOn}
        setAudio={setAudio}
        isFullscreen={isFullscreen}
        toggleFullscreen={toggleFullscreen}
        setActiveConnection={setActiveConnection}
      />
    </div>
  );
};

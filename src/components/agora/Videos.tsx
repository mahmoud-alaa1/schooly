"use client";

import {
  useJoin,
  useRemoteAudioTracks,
  useRemoteUsers,
  usePublish,
  useRemoteVideoTracks,
} from "agora-rtc-react";
import { useState, useEffect, useId, useRef } from "react";
import { useParams } from "next/navigation";
import { useFullscreen } from "@/hooks/useFullscreen";
import { useMicrophone } from "@/hooks/useMicrophone";
import { useCamera } from "@/hooks/useCamera";
import { VideoToolbar } from "./VideoToolbar";
import { motion, AnimatePresence } from "framer-motion";
import { Minimize } from "lucide-react";
import { Button } from "../ui/button";
import VideoTile from "./video-tile/VideoTile";
import { useAuth } from "@/store/auth";
import useGetProfile from "@/hooks/profile/useGetProfile";

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
  useRemoteVideoTracks(remoteUsers); // This will give you the remote video tracks, it is important i should call it even if i don't use its return

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
    return () => {
      audioTracks.forEach((track) => {
        try {
          track.stop();
        } catch (error) {
          console.error("Error stopping audio track:", error);
        }
      });
    };
  }, [audioTracks, audioOn]);

  const id = useAuth((state) => state.user?.id);

  const picture = useGetProfile().data?.data.profilePictureUrl;
  const name = useGetProfile().data?.data.name;
  const [shouldJoin, setShouldJoin] = useState(false);
  const encodedName = useRef<string | null>(null);
  useEffect(() => {
    if (picture && name && id) {
      setShouldJoin(true);
      encodedName.current = encodeURIComponent(name);
    }
  }, [picture, name, id]);

  useJoin(
    {
      appid: process.env.NEXT_PUBLIC_AGORA_APP_ID!,
      token: localStorage.getItem("agora-token"),
      channel: lessonId as string,
      uid: id,
    },
    shouldJoin,
  );

  usePublish([localMicrophoneTrack, localCameraTrack]);


  return (
    <>
      {remoteUsers.length > 3 && (
        <div
          className="my-4 flex w-full max-w-full overflow-x-auto overflow-y-hidden"
          style={{ height: 225 }}
        >
          <div className="flex gap-4" style={{ minWidth: 200 }}>
            {remoteUsers.slice(3).map((user) => (
              <div
                key={user.uid}
                className="flex-shrink-0"
                style={{ width: 200, height: 200 }}
              >
                <VideoTile
                  uid={user.uid as string}
                  videoTrack={user.videoTrack || null}
                  hasVideo={user.hasVideo}
                  hasAudio={user.hasAudio}
                />
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="flex aspect-video! w-full grow flex-col justify-between p-1">
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
            videoTrack={localCameraTrack}
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
                  uid={user.uid as string}
                  videoTrack={user.videoTrack || null}
                  hasVideo={user.hasVideo}
                  hasAudio={user.hasAudio}
                />
              );
            })}
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
        {/* Scrollable horizontal div for extra users */}

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
    </>
  );
};

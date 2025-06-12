"use client";

import {
  useJoin,
  useLocalCameraTrack,
  useLocalMicrophoneTrack,
  usePublish,
  useRemoteAudioTracks,
  useRemoteUsers,
  LocalUser,
  RemoteUser,
  LocalVideoTrack,
} from "agora-rtc-react";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export const LiveVideo = () => {
  const [activeConnection, setActiveConnection] = useState(true);
  const [micOn, setMic] = useState(true);
  const [cameraOn, setCamera] = useState(true);

  const { localMicrophoneTrack, isLoading: isLoadingMic } =
    useLocalMicrophoneTrack(micOn);
  const { localCameraTrack, isLoading: isLoadingCam } =
    useLocalCameraTrack(cameraOn);

  const { lessonId, classroomId } = useParams();

  const remoteUsers = useRemoteUsers();
  const { audioTracks } = useRemoteAudioTracks(remoteUsers);

  // Play audio tracks once and add error handling
  useEffect(() => {
    audioTracks.forEach((track) => {
      try {
        track.play(); // REMOVE if using RemoteUser correctly
      } catch (error) {
        console.error("Error playing audio track:", error);
      }
    });
  }, [audioTracks]);
  const router = useRouter();

  useJoin(
    {
      appid: process.env.NEXT_PUBLIC_AGORA_APP_ID!,
      token: null,
      channel: ((lessonId as string) + classroomId) as string,
    },
    activeConnection,
  );
  usePublish([localMicrophoneTrack, localCameraTrack]);
  const unit = "minmax(0, 1fr) ";
  const deviceLoading = isLoadingMic || isLoadingCam;

  if (deviceLoading)
    return (
      <div className="flex flex-col items-center pt-40">Loading devices...</div>
    );
  return (
    <div className="flex h-screen w-full flex-col justify-between p-1">
      <div
        className={`grid flex-1 gap-1`}
        style={{
          gridTemplateColumns:
            remoteUsers.length > 9
              ? unit.repeat(4)
              : remoteUsers.length > 4
                ? unit.repeat(3)
                : remoteUsers.length > 1
                  ? unit.repeat(2)
                  : unit,
        }}
      >
        <LocalVideoTrack
          track={localCameraTrack}
          play={true}
          className="h-full w-full"
        />
        {remoteUsers.map((user) => (
          <RemoteUser key={user.uid} user={user} playAudio={true} />
        ))}
      </div>
    </div>
  );
};

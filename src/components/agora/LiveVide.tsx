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
} from "agora-rtc-react";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";

export const LiveVideo = () => {
  const appId = process.env.NEXT_PUBLIC_AGORA_APP_ID!;
  const { channelName } = useParams();
  const [activeConnection, setActiveConnection] = useState(true);
  const [micOn, setMic] = useState(true);
  const [cameraOn, setCamera] = useState(true);

  const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
  const { localCameraTrack } = useLocalCameraTrack(cameraOn);

  useJoin(
    {
      appid: appId,
      channel: String(Math.abs(parseInt(channelName as string) % 65536)),
      token: null,
    },
    activeConnection,
  );
  usePublish([localMicrophoneTrack, localCameraTrack]);

  const remoteUsers = useRemoteUsers();
  const { audioTracks } = useRemoteAudioTracks(remoteUsers);
  audioTracks.forEach((track) => track.play());

  const router = useRouter();

  return (
    <>
      <div id="remoteVideoGrid">
        {remoteUsers.map((user) => (
          <div key={user.uid} className="remote-video-container">
            <RemoteUser user={user} />
          </div>
        ))}
      </div>

      <div id="localVideo">
        <LocalUser
          audioTrack={localMicrophoneTrack}
          videoTrack={localCameraTrack}
          cameraOn={cameraOn}
          micOn={micOn}
          playAudio={micOn}
          playVideo={cameraOn}
        />

        <div id="controlsToolbar">
          <div id="mediaControls">
            <button className="btn" onClick={() => setMic((a) => !a)}>
              Mic
            </button>
            <button className="btn" onClick={() => setCamera((a) => !a)}>
              Camera
            </button>
          </div>
          <button
            id="endConnection"
            onClick={() => {
              setActiveConnection(false);
              router.push("/");
            }}
          >
            Disconnect
          </button>
        </div>
      </div>
    </>
  );
};

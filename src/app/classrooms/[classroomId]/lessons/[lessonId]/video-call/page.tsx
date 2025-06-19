import AgorLiveVideoWrapper from "@/components/agora/AgorLiveVideoWrapper";
import LiveRoomHeader from "@/components/live-room/LiveRoomHeader";
import React from "react";

export default function page() {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-[#E6FBF5] p-5">
      <LiveRoomHeader />
      <AgorLiveVideoWrapper />
    </div>
  );
}

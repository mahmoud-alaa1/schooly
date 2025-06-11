"use client";

import { ConnectForm } from "@/components/ConnectForm";
import { useRouter } from "next/navigation";
import React from "react";
export default function AgoraWrapper() {
  const handleConnect = (channelName: string) => {
    navigate.push(`/via/${channelName}`); // on form submit, navigate to new route
  };
  const navigate = useRouter();

  return (
    <div>
      <ConnectForm connectToVideo={handleConnect} />
    </div>
  );
}

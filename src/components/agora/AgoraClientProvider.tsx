"use client";

import { AgoraRTCProvider } from "agora-rtc-react";
import AgoraRTC from "agora-rtc-react";

const client = AgoraRTC.createClient({
  mode: "rtc",
  codec: "vp8",
}) as any;

export default function AgoraClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AgoraRTCProvider client={client}>{children}</AgoraRTCProvider>;
}

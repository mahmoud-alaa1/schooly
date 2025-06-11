import { create } from "zustand";
import { IAgoraRTCRemoteUser } from "agora-rtc-react";

type AgoraState = {
  users: IAgoraRTCRemoteUser[];
  localTracks: any[];
  isMuted: boolean;
  isVideoOn: boolean;
  isSharingScreen: boolean;
  isJoined: boolean;
  addUser: (user: IAgoraRTCRemoteUser) => void;
  removeUser: (uid: string) => void;
  setLocalTracks: (tracks: any[]) => void;
  toggleMic: () => void;
  toggleCamera: () => void;
  toggleScreenShare: () => void;
  setJoined: (joined: boolean) => void;
};

export const useAgoraStore = create<AgoraState>((set) => ({
  users: [],
  localTracks: [],
  isMuted: false,
  isVideoOn: true,
  isSharingScreen: false,
  isJoined: false,
  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
  removeUser: (uid) =>
    set((state) => ({ users: state.users.filter((user) => user.uid !== uid) })),
  setLocalTracks: (tracks) => set({ localTracks: tracks }),
  toggleMic: () => set((state) => ({ isMuted: !state.isMuted })),
  toggleCamera: () => set((state) => ({ isVideoOn: !state.isVideoOn })),
  toggleScreenShare: () =>
    set((state) => ({ isSharingScreen: !state.isSharingScreen })),
  setJoined: (joined) => set({ isJoined: joined }),
}));

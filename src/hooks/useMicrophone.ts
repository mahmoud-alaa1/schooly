import { useLocalMicrophoneTrack } from "agora-rtc-react";
import { useState, useEffect } from "react";

export const useMicrophone = (initialState = false) => {
  const [isEnabled, setIsEnabled] = useState(initialState);
  const { localMicrophoneTrack, isLoading } =
    useLocalMicrophoneTrack(isEnabled);

  useEffect(() => {
    if (localMicrophoneTrack) {
      localMicrophoneTrack.setEnabled(isEnabled);
    }
  }, [isEnabled, localMicrophoneTrack]);

  const toggle = () => setIsEnabled((prev) => !prev);
  const enable = () => setIsEnabled(true);
  const disable = () => setIsEnabled(false);

  return {
    isEnabled,
    toggle,
    enable,
    disable,
    track: localMicrophoneTrack,
    isLoading,
  };
};

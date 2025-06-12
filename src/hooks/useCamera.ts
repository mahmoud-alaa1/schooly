import { useLocalCameraTrack } from "agora-rtc-react";
import { useState, useEffect } from "react";

export const useCamera = (initialState = false) => {
  const [isEnabled, setIsEnabled] = useState(initialState);
  const { localCameraTrack, isLoading } = useLocalCameraTrack(isEnabled);

  useEffect(() => {
    if (localCameraTrack) {
      localCameraTrack.setEnabled(isEnabled);
    }
  }, [isEnabled, localCameraTrack]);

  const toggle = () => setIsEnabled((prev) => !prev);
  const enable = () => setIsEnabled(true);
  const disable = () => setIsEnabled(false);

  return {
    isEnabled,
    toggle,
    enable,
    disable,
    track: localCameraTrack,
    isLoading,
  };
};

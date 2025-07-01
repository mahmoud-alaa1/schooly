import { useState, useEffect, useRef } from "react";

interface UseFullscreenReturn<T extends HTMLElement> {
  isFullscreen: boolean;
  toggleFullscreen: () => void;
  ref: React.RefObject<T | null>;
}

export const useFullscreen = <
  T extends HTMLElement,
>(): UseFullscreenReturn<T> => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const ref = useRef<T>(null);

  const toggleFullscreen = () => {
    if (!ref.current) {
      return;
    }

    try {
      if (!document.fullscreenElement) {
        ref.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (error) {
      console.log("Error toggling fullscreen:", error);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  return { isFullscreen, toggleFullscreen, ref };
};

"use client";
import { useState, useRef, useCallback } from "react";
import type Webcam from "react-webcam";

export const useWebCamera = (onCapture?: (imageData: string) => void) => {
  const webcamRef = useRef<Webcam>(null);
  const [image, setImage] = useState<string | null>(null);

  const capture = useCallback(() => {
    const screenshot = webcamRef.current?.getScreenshot();
    if (screenshot) {
      setImage(screenshot);
      onCapture?.(screenshot);
    }
  }, [onCapture]);

  const resetCapture = useCallback(() => {
    setImage(null);
  }, []);

  return {
    webcamRef,
    image,
    capture,
    resetCapture,
  };
};

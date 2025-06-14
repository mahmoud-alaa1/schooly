"use client";
import Webcam from "react-webcam";
import { ScanEye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CAMERA_CONFIG, CAMERA_MESSAGES } from "@/lib/constants";

interface CameraPreviewProps {
  webcamRef: React.RefObject<Webcam | null>;
  onCapture: () => void;
}

const CameraPreview = ({ webcamRef, onCapture }: CameraPreviewProps) => (
  <div className="relative flex w-full flex-col items-center justify-center">
    <Webcam
      audio={false}
      ref={webcamRef}
      screenshotFormat={CAMERA_CONFIG.screenshotFormat}
      width={CAMERA_CONFIG.width}
      videoConstraints={CAMERA_CONFIG.videoConstraints}
      className="rounded-lg"
    />
    <Button
      onClick={onCapture}
      className="absolute bottom-3 flex items-center gap-2 shadow-lg"
      size="sm"
    >
      <span>{CAMERA_MESSAGES.CAPTURE}</span>
      <ScanEye className="h-4 w-4" />
    </Button>
  </div>
);

export default CameraPreview;

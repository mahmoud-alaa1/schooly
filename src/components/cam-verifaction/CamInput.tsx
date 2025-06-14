"use client";
import { useWebCamera } from "@/hooks/useWebCamera";
import { getCameraState } from "@/lib/utils";
import CapturedImage from "./camera/CapturedImage";
import CameraPreview from "./camera/CameraPreview";
import CameraPlaceholder from "./camera/CameraPlaceholder";

export interface CameraInputProps {
  onCapture?: (imageData: string) => void;
  isCapturing: boolean;
  setIsCapturing: (isCapturing: boolean) => void;
}
const CamInput = ({
  onCapture,
  isCapturing,
  setIsCapturing,
}: CameraInputProps) => {
  const { webcamRef, image, capture, resetCapture } = useWebCamera(onCapture);

  const cameraState = getCameraState(!!image, isCapturing);

  const handleCapture = () => {
    capture();
    setIsCapturing(false);
  };

  const handleRetake = () => {
    resetCapture();
    setIsCapturing(true);
  };

  const handleStartCapture = () => {
    setIsCapturing(true);
  };

  const renderCameraInterface = () => {
    switch (cameraState) {
      case "captured":
        return <CapturedImage image={image!} onRetake={handleRetake} />;
      case "capturing":
        return (
          <CameraPreview webcamRef={webcamRef} onCapture={handleCapture} />
        );
      default:
        return <CameraPlaceholder onStartCapture={handleStartCapture} />;
    }
  };

  return <div className="w-full">{renderCameraInterface()}</div>;
};

export default CamInput;

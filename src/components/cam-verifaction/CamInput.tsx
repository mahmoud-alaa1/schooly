"use client";
import { useWebCamera } from "@/hooks/useWebCamera";
import { getCameraState } from "@/lib/utils";
import CapturedImage from "./camera/CapturedImage";
import CameraPreview from "./camera/CameraPreview";
import CameraPlaceholder from "./camera/CameraPlaceholder";
import { motion, AnimatePresence } from "framer-motion";

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
        return (
          <motion.div
            key="captured"
            initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotateY: 90 }}
            transition={{
              duration: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <CapturedImage image={image!} onRetake={handleRetake} />
          </motion.div>
        );
      case "capturing":
        return (
          <motion.div
            key="capturing"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(59, 130, 246, 0.7)",
                  "0 0 0 10px rgba(59, 130, 246, 0)",
                  "0 0 0 0 rgba(59, 130, 246, 0)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="rounded-lg"
            >
              <CameraPreview webcamRef={webcamRef} onCapture={handleCapture} />
            </motion.div>
          </motion.div>
        );
      default:
        return (
          <motion.div
            key="placeholder"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <CameraPlaceholder onStartCapture={handleStartCapture} />
            </motion.div>
          </motion.div>
        );
    }
  };

  return (
    <motion.div className="w-full" layout transition={{ duration: 0.3 }}>
      <AnimatePresence mode="wait">{renderCameraInterface()}</AnimatePresence>
    </motion.div>
  );
};

export default CamInput;

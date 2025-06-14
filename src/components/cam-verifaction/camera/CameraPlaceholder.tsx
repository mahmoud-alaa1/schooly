"use client";
import { CAMERA_MESSAGES } from "@/lib/constants";
import { Camera } from "lucide-react";

interface CameraPlaceholderProps {
  onStartCapture: () => void;
}

const CameraPlaceholder = ({ onStartCapture }: CameraPlaceholderProps) => (
  <button
    onClick={onStartCapture}
    className="flex w-full cursor-pointer flex-col items-center justify-center rounded-lg p-8 transition-colors hover:bg-gray-50"
    type="button"
  >
    <Camera className="mb-2 h-12 w-12 text-gray-400" />
    <span className="text-sm text-gray-500">
      {CAMERA_MESSAGES.CAPTURE_INSTRUCTION}
    </span>
  </button>
);
export default CameraPlaceholder;

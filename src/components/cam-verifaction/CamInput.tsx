"use client";

import React, {
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import Image from "next/image";
import Webcam from "react-webcam";
import { Camera, ScanEye } from "lucide-react";
import { Button } from "../ui/button";
interface CameraInputProps {
  onCapture?: (imageData: string) => void;
  isCapturing: boolean;
  setIsCapturing: (isCapturing: boolean) => void;
}

const CamInput = ({
  onCapture,
  isCapturing,
  setIsCapturing,
}: CameraInputProps) => {
  const webcamRef = useRef<Webcam>(null);
  const [image, setImage] = useState<string | null>(null);

  const capture = () => {
    const screenshot = webcamRef.current?.getScreenshot();
    if (screenshot) {
      setImage(screenshot);
      onCapture?.(screenshot);
    }
    setIsCapturing(false);
  };

  return (
    <div>
      {image ? (
        <div className="relative flex w-full flex-col items-center justify-center">
          <Image
            src={image}
            alt="Captured"
            width={500}
            height={200}
            style={{ width: "100%", maxWidth: "500px", objectFit: "cover" }}
          />
          <Button
            onClick={() => {
              setImage(null);
              setIsCapturing(true);
            }}
            className="absolute bottom-3 flex items-center gap-2"
          >
            التقط صورة جديدة
          </Button>
        </div>
      ) : isCapturing ? (
        <div className="relative flex w-full flex-col items-center justify-center">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={500}
            videoConstraints={{ facingMode: "user" }}
          />
          <Button
            onClick={capture}
            className="absolute bottom-3 flex items-center gap-2"
          >
            <span> التقط صورة</span>
            <ScanEye className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <button
          onClick={() => setIsCapturing(true)}
          className="flex w-full cursor-pointer flex-col items-center justify-center"
        >
          <Camera />
          <span className="text-[#00000073]"> التقط صورة من خلال الكامير</span>
        </button>
      )}
    </div>
  );
};

export default CamInput;

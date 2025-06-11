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
  onCapture?: (imageData: string) => void; // Base64 image callback
}

const CamInput = forwardRef<{ reset: () => void }, CameraInputProps>(
  ({ onCapture }, ref) => {
    const webcamRef = useRef<Webcam>(null);
    const [image, setImage] = useState<string | null>(null);
    const [isCapturing, setIsCapturing] = useState(false);

    const capture = () => {
      const screenshot = webcamRef.current?.getScreenshot();
      if (screenshot) {
        setImage(screenshot);
        onCapture?.(screenshot);
      }
      setIsCapturing(false);
    };

    useImperativeHandle(ref, () => ({
      reset: () => setImage(null),
    }));

    return (
      <div className="p-4">
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
              Retake
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
            className="flex w-full cursor-pointer flex-col items-center justify-center border-1 border-[#D9D9D9] bg-[#FAFAFA] py-8"
          >
            <Camera />
            <span className="text-[#00000073]">
              {" "}
              التقط صورة من خلال الكامير
            </span>
          </button>
        )}
      </div>
    );
  },
);

CamInput.displayName = "CamInput";

export default CamInput;

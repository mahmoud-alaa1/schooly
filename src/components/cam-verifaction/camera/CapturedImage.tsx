"use client";
import { Button } from "@/components/ui/button";
import { CAMERA_CONFIG, CAMERA_MESSAGES } from "@/lib/constants";
import Image from "next/image";

interface CapturedImageProps {
  image: string;
  onRetake: () => void;
}

const CapturedImage = ({ image, onRetake }: CapturedImageProps) => (
  <div className="relative flex w-full flex-col items-center justify-center">
    <Image
      src={image}
      alt="Captured verification photo"
      width={CAMERA_CONFIG.width}
      height={CAMERA_CONFIG.height}
      className="rounded-lg object-cover"
      style={{
        width: "100%",
        maxWidth: `${CAMERA_CONFIG.width}px`,
        objectFit: "cover",
      }}
    />
    <Button
      onClick={onRetake}
      className="absolute bottom-3 flex items-center gap-2 shadow-lg"
      variant="secondary"
      size="sm"
    >
      {CAMERA_MESSAGES.CAPTURE_NEW}
    </Button>
  </div>
);

export default CapturedImage;

"use client";

import { EVerificationState } from "@/types/enums";
import VerificationLoading from "./VerificationLoading";
import VerificationError from "./VerificationError";
import VerificationSuccess from "./VerificationSuccess";
import CamInput from "./CamInput";

interface VerificationContentProps {
  state: EVerificationState;
  onCapture: (image: string) => void;
  isCapturing: boolean;
  setIsCapturing: (capturing: boolean) => void;
}

const VerificationContent = ({
  state,
  onCapture,
  isCapturing,
  setIsCapturing,
}: VerificationContentProps) => {
  const renderContent = () => {
    switch (state) {
      case EVerificationState.LOADING:
        return <VerificationLoading />;
      case EVerificationState.ERROR:
        return <VerificationError />;
      case EVerificationState.SUCCESS:
        return <VerificationSuccess />;
      default:
        return (
          <CamInput
            onCapture={onCapture}
            isCapturing={isCapturing}
            setIsCapturing={setIsCapturing}
          />
        );
    }
  };

  return (
    <div className="rounded-md border border-gray-300 bg-gray-50 p-4 py-8">
      {renderContent()}
    </div>
  );
};

export default VerificationContent;

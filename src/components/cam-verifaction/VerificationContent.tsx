"use client";

import { EVerificationState } from "@/types/enums";
import VerificationLoading from "./VerificationLoading";
import VerificationError from "./VerificationError";
import VerificationSuccess from "./VerificationSuccess";
import CamInput from "./CamInput";
import { AnimatePresence, motion } from "framer-motion";

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
        return (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <VerificationLoading />
          </motion.div>
        );
      case EVerificationState.ERROR:
        return (
          <motion.div
            key="error"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <VerificationError />
          </motion.div>
        );
      case EVerificationState.SUCCESS:
        return (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.4, ease: "backOut" }}
          >
            <VerificationSuccess />
          </motion.div>
        );
      default:
        return (
          <motion.div
            key="camera"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <CamInput
              onCapture={onCapture}
              isCapturing={isCapturing}
              setIsCapturing={setIsCapturing}
            />
          </motion.div>
        );
    }
  };

  return (
    <motion.div
      className="rounded-md border border-gray-300 bg-gray-50 p-4 py-8"
      layout
      transition={{ duration: 0.3 }}
    >
      <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
    </motion.div>
  );
};

export default VerificationContent;

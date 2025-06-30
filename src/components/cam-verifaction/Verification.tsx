"use client";
import { Dialog, DialogContent } from "../ui/dialog";
import { useState, useCallback } from "react";
import useJoinLesson from "@/hooks/lessons/useJoinLesson";
import { useVerificationState } from "@/hooks/useVerificationState";
import VerificationHeader from "./VerificationHeader";
import VerificationContent from "./VerificationContent";
import RetryButton from "./RetryButton";
import VerificationActions from "./VerificationActions";
import { AnimatePresence, motion } from "framer-motion";

export type JoinLessonData = {
  lessonId: string;
  image: string;
  classroomId: string;
};

interface VerificationProps {
  open: boolean;
  onClose: () => void;
  lessonId: string;
  classroomId: string;
}

const Verification = ({
  open,
  onClose,
  lessonId,
  classroomId,
}: VerificationProps) => {
  const [capturedImage, setCapturedImage] = useState<string>("");
  const [isCapturing, setIsCapturing] = useState(false);

  const { mutate, isPending, isError, isSuccess, reset } = useJoinLesson();
  const currentState = useVerificationState({ isPending, isError, isSuccess });

  const handleSubmit = useCallback(() => {
    if (!capturedImage) return;

    const data: JoinLessonData = {
      lessonId,
      image: capturedImage,
      classroomId,
    };

    mutate(data);
  }, [capturedImage, lessonId, classroomId, mutate]);

  const handleRetry = useCallback(() => {
    setCapturedImage("");
    setIsCapturing(true);
    reset();
  }, [reset]);

  const handleCancel = useCallback(() => {
    setCapturedImage("");
    reset();
    onClose();
  }, [onClose, reset]);

  return (
    <AnimatePresence>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent
          className="max-w-[600px] bg-white p-0 [&>button:last-child]:hidden"
          dir="rtl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{
              duration: 0.3,
              ease: [0.4, 0.0, 0.2, 1],
            }}
            className="flex flex-col"
          >
            <VerificationHeader onClose={onClose} />

            <motion.div
              className="p-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <VerificationContent
                state={currentState}
                onCapture={setCapturedImage}
                isCapturing={isCapturing}
                setIsCapturing={setIsCapturing}
              />

              <RetryButton onRetry={handleRetry} show={isError} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <VerificationActions
                onCancel={handleCancel}
                onSubmit={handleSubmit}
                isSubmitDisabled={
                  isPending || isError || !capturedImage || isSuccess
                }
                isPending={isPending}
              />
            </motion.div>
          </motion.div>
        </DialogContent>
      </Dialog>
    </AnimatePresence>
  );
};

export default Verification;

"use client";
import { Dialog, DialogContent } from "../ui/dialog";
import { useState, useCallback } from "react";
import useJoinLesson from "@/hooks/lessons/useJoinLesson";
import { useVerificationState } from "@/hooks/useVerificationState";
import VerificationHeader from "./VerificationHeader";
import VerificationContent from "./VerificationContent";
import RetryButton from "./RetryButton";
import VerificationActions from "./VerificationActions";

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
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="max-w-[600px] bg-white p-0 [&>button:last-child]:hidden"
        dir="rtl"
      >
        <VerificationHeader onClose={onClose} />

        <div className="p-4">
          <VerificationContent
            state={currentState}
            onCapture={setCapturedImage}
            isCapturing={isCapturing}
            setIsCapturing={setIsCapturing}
          />

          <RetryButton onRetry={handleRetry} show={isError} />
        </div>

        <VerificationActions
          onCancel={handleCancel}
          onSubmit={handleSubmit}
          isSubmitDisabled={isPending || isError || !capturedImage || isSuccess}
          isPending={isPending}
        />
      </DialogContent>
    </Dialog>
  );
};

export default Verification;

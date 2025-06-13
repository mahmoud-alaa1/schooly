"use client";

import { joinLesson } from "@/services/lessonServices";
import { ILessonJoinData } from "@/types/lessons";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

function useJoinLesson() {
  const mutation = useMutation({
    mutationFn: (data: ILessonJoinData) => joinLesson(data),
    onSuccess: (data) => {
      console.log("Face verification successful:", data);
      toast.success("تم التعرف على وجهك بنجاح، جاري تحويلك إلى الدرس");
    },
    onError: (error) => {
      console.error("Error during verify code:", error.message);
    },
  });
  return mutation;
}

export default useJoinLesson;

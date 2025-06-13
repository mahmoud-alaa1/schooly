"use client";

import { base64ToBlob } from "@/lib/utils";
import { joinLesson } from "@/services/lessonServices";
import { ILessonJoinData, ILessonJoinResponse } from "@/types/lessons";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

interface IJoinLessonData extends ILessonJoinData {
  classroomId: string;
}

function useJoinLesson() {
  const mutation = useMutation({
    mutationFn: async (data: {
      image: string;
      lessonId: string;
      classroomId: string;
    }) => {
      const imageBlob = base64ToBlob(data.image);
      const sentData = new FormData();
      sentData.append("image", imageBlob);
      return await joinLesson(sentData, data.lessonId);
    },
    onSuccess: (data, varaibles) => {
      console.log("Face verification successful:", data);

      localStorage.setItem("agora-token", data.data.token);
      router.push(
        `/classrooms/${varaibles.classroomId}/lessons/${varaibles.lessonId}/video-call`,
      );
      toast.success("تم التعرف على وجهك بنجاح، جاري تحويلك إلى الدرس");
    },

    onError: (error) => {

      console.error("Error during verify code:", error.message);
    },
  });
  return mutation;
}

export default useJoinLesson;

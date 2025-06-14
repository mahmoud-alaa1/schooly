"use client";

import { JoinLessonData } from "@/components/cam-verifaction/Verification";
import { base64ToBlob } from "@/lib/utils";
import { joinLesson } from "@/services/lessonServices";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

function useJoinLesson() {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async (data: JoinLessonData) => {
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
    },

    onError: (error) => {
      console.log("Error during verify code:", error.name);
    },
  });
  return mutation;
}

export default useJoinLesson;

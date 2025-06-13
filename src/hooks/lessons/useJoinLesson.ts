"use client";

import { joinLesson } from "@/services/lessonServices";
import { ILessonJoinData, ILessonJoinResponse } from "@/types/lessons";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface IJoinLessonData extends ILessonJoinData {
  classroomId: string;
}

function useJoinLesson() {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await fetch(`/api/agora/token`, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (!res.ok) throw new Error("فشل تحقق الهوية");
      return res.json() as Promise<ILessonJoinResponse>;
    },
    onSuccess: (data) => {
      console.log("Face verification successful:", data);
      // setTimeout(() => {
      //   router.push(
      //     `/classrooms/${varaibles.classroomId}/lessons/${varaibles.lessonId}/video-call`,
      //   );
      // }, 3000);
    },

    onError: (error) => {
      console.log("Error during verify code:", error.message);
    },
  });
  return mutation;
}

export default useJoinLesson;

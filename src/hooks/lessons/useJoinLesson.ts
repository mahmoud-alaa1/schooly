"use client";

import { JoinLessonData } from "@/components/cam-verifaction/Verification";
import { ILessonJoinResponse } from "@/types/lessons";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

function useJoinLesson() {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async (data: JoinLessonData) => {
      const res = await fetch(`/api/agora/join`, {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("فشل تحقق الهوية");
      return res.json() as Promise<ILessonJoinResponse>;
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

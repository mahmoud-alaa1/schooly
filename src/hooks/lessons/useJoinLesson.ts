"use client";

import { joinLesson } from "@/services/lessonServices";
import { ILessonJoinData } from "@/types/lessons";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

function useJoinLesson() {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: (data: ILessonJoinData) => joinLesson(data),
    onSuccess: (data) => {
      console.log("Face verification successful:", data);
      //   setTimeout(() => {
      //     router.push("/lesson");
      //   }, 3000);
    },
    onError: (error) => {
      console.log("Error during verify code:", error.message);
    },
  });
  return mutation;
}

export default useJoinLesson;

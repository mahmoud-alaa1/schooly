import { createLesson } from "@/services/lessonServices";
import { ILessonPostData } from "@/types/lessons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import useOptimisticCreate from "../useOptimisticCreate";

export default function useCreateLesson() {
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: async (data: ILessonPostData) => await createLesson(data),
    onSuccess: (data) => {
      toast.success("تم إنشاء الدرس بنجاح!");

      queryClient.refetchQueries({
        queryKey: ["lessons"],
        exact: false,
      });
    },
    onError: (error) => {
      console.error("Error creating lesson:", error.message);
      toast.error("حدث خطأ أثناء إنشاء الدرس. يرجى المحاولة مرة أخرى.");
    },
    onSettled: () => {
      console.log("Create lesson mutation settled");
    },
  });

  return res;
}

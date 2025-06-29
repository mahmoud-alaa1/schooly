import { createLesson } from "@/services/lessonServices";
import { ILessonPostData } from "@/types/lessons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useCreateLesson() {
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: async (data: ILessonPostData) => await createLesson(data),
    onSuccess: () => {
      toast.success("تم إنشاء الدرس بنجاح!");
      queryClient.invalidateQueries({
        queryKey: ["upcoming-lessons"],
      });
      queryClient.refetchQueries({
        queryKey: ["lessons"],
        exact: false,
      });
    },
    onError: (error) => {
      toast.error(
        error.message || "حدث خطأ أثناء إنشاء الدرس. يرجى المحاولة مرة أخرى.",
      );
    },
  });

  return res;
}

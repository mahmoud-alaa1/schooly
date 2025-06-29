import { updateLesson } from "@/services/lessonServices";
import { ILessonPutData } from "@/types/lessons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useUpdateLesson() {
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: async (data: ILessonPutData) => await updateLesson(data),
    onSuccess: () => {
      toast.success("تم تحديث الدرس بنجاح!");
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
        error.message || "حدث خطأ أثناء تحديث الدرس. يرجى المحاولة مرة أخرى.",
      );
    },
  });

  return res;
}

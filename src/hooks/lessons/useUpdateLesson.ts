import { updateLesson } from "@/services/lessonServices";
import { ILessonPutData } from "@/types/lessons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useUpdateLesson() {
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: async (data: ILessonPutData) => await updateLesson(data),
    onSuccess: (data) => {
      toast.success("تم تحديث الدرس بنجاح!");

      queryClient.refetchQueries({
        queryKey: ["lessons"],
        exact: false,
      });
    },
    onError: (error) => {
      console.error("Error creating lesson:", error.message);
      toast.error("حدث خطأ أثناء تحديث الدرس. يرجى المحاولة مرة أخرى.");
    },
    onSettled: () => {
      console.log("Create lesson mutation settled");
    },
  });

  return res;
}

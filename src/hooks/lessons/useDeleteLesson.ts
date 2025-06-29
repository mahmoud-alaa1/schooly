import { deleteLesson } from "@/services/lessonServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useDeleteLesson(id: string) {
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: () => deleteLesson(id),
    onSuccess: () => {
      toast.success("تم حذف الدرس بنجاح!");
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
        error.message || "حدث خطأ أثناء حذف الدرس. يرجى المحاولة مرة أخرى.",
      );
    },
  });

  return res;
}

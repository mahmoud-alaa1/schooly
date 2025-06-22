import { deleteLesson } from "@/services/lessonServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useDeleteLesson(id: string) {
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: () => deleteLesson(id),
    onSuccess: () => {
      toast.success("تم حذف الدرس بنجاح!");

      queryClient.refetchQueries({
        queryKey: ["lessons"],
        exact: false,
      });
    },
    onError: (error) => {
      console.error("Error creating lesson:", error.message);
      toast.error("حدث خطأ أثناء حذف الدرس. يرجى المحاولة مرة أخرى.");
    },
    onSettled: () => {
      console.log("Create lesson mutation settled");
    },
  });

  return res;
}

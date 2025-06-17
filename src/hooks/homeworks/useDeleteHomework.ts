import { deleteHomework } from "@/services/homeworksServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

function useDeleteHomework(homeWorkId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteHomework(homeWorkId),

    onSuccess: () => {
      toast.success("تم حذف الواجب بنجاح");
      queryClient.refetchQueries({ queryKey: ["homeworks"], exact: false });
    },
    onError: () => {
      toast.error("حدث خطأ أثناء حذف الواجب");
    },
  });
}

export default useDeleteHomework;

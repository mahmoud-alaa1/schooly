import { deleteHomework } from "@/services/homeworksServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

function useDeleteHomework(homeWorkId: string) {
  const searchParams = useSearchParams();
  const values = searchParams.getAll("classroom") || "all";

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteHomework(homeWorkId),

    onSuccess: () => {
      toast.success("تم حذف الواجب بنجاح");
      queryClient.invalidateQueries({ queryKey: ["homeworks", values] });
    },
    onError: () => {
      toast.error("حدث خطأ أثناء حذف الواجب");
    },
  });
}

export default useDeleteHomework;

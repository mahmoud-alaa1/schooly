import { submitHomework } from "@/services/homeworksServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useSubmitHomework() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ISubmitHomeworkPostData) => submitHomework(data),
    onSuccess: (data) => {
      queryClient.refetchQueries({
        queryKey: ["homeworks"],
        exact: false,
      });
      toast.success("تم ارسال الواجب بنجاح");
    },
    onError: (error) => {
      toast.error(
        error.message || "حدث خطأ ما في ارسال الواجب، يرجى المحاولة مرة أخرى",
      );
    },
  });
}

import { createHomework } from "@/services/homeworksServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useCreateHomework() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IHomeworkFormData) => createHomework(data),
    onSuccess: () => {
      toast.success("تم انشاء الواجب بنجاح");

      queryClient.invalidateQueries({
        queryKey: ["homeworks"],
      });
    },
    onError: (error) => {
      toast.error(
        error.message || "حدث خطأ ما في انشاء الواجب، يرجى المحاولة مرة أخرى",
      );
    },
  });
}

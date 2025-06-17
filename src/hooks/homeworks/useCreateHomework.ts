import { createHomework } from "@/services/homeworksServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { toast } from "sonner";

export default function useCreateHomework() {
  const queryClient = useQueryClient();
  const { classroomId } = useParams();
  return useMutation({
    mutationFn: (data: IHomeworkFormData) => createHomework(data),
    onSuccess: (data) => {
      console.log("Homework created successfully:", data);
      toast.success("تم انشاء الواجب بنجاح");
    },
    onError: (error) => {
      console.error("Error creating homework:", error);
      toast.error("حدث خطأ ما في انشاء الواجب، يرجى المحاولة مرة أخرى");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["homeworks"],
      });
    },
  });
}

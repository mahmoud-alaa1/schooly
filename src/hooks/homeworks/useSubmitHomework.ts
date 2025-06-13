import { submitHomework } from "@/services/homeworksServices";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useSubmitHomework() {
  return useMutation({
    mutationFn: (data: ISubmitHomeworkPostData) => submitHomework(data),
    onSuccess: (data) => {
      console.log("Homework created successfully:", data);
      toast.success("تم ارسال الواجب بنجاح");
    },
    onError: (error) => {
      console.error("Error submitting homework:", error);
      toast.error("حدث خطأ ما في ارسال الواجب، يرجى المحاولة مرة أخرى");
    },
  });
}

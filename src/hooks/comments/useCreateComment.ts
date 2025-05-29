import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment } from "@/services/commentsServices";
import { toast } from "sonner";

export default function useCreateComment(postId: string | number) {
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: ICommentPostData) => {
      return createComment(data);
    },

    onError: (e) => {
      console.error(e);
      toast.error("حدث خطأ ما في انشاء التعليق");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
  });
  return res;
}

import { deleteComment } from "@/services/commentsServices";
import useOptimisticDelete from "../useOptimisticDelete";

export default function useDeleteComment(postId: string | number) {
  return useOptimisticDelete<IComment>({
    deleteFn: deleteComment,
    queryKey: ["comments", postId],
    matcher: (comment, id) => comment.id === id,
    messages: {
      error: "حدث خطأ في حذف التعليق",
    },
  });
}

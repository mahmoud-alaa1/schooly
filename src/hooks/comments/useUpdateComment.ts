import { updateComment } from "@/services/commentsServices";
import useOptimisticUpdate from "../useOptimisticUpdate";


export default function useUpdateComment(postId: string | number) {
  return useOptimisticUpdate<IComment, ICommentPutData>({
    updateFn: updateComment,
    queryKey: ["comments", postId],
    matcher: (comment, input) => comment.id === input.id,
    updater: (comment, input) => ({
      ...comment,
      content: input.content,
    }),
    messages: {
      success: "تم تحديث التعليق بنجاح",
      error: "حدث خطأ في تحديث التعليق",
    },
  });
}

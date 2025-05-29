import { createComment } from "@/services/commentsServices";
import useOptimisticCreate from "../useOptimisticCreate";
import { useAuth } from "@/store/auth";

export default function useCreateComment(postId: string | number) {
  const user = useAuth((state) => state.user);

  return useOptimisticCreate<IComment, ICommentPostData>({
    createFn: createComment,
    queryKey: ["comments", postId],
    optimisticData: (input) => ({
      id: Date.now(),
      content: input.content,
      createdAt: new Date().toISOString(),
      authorId: user?.id || "",
      authorName: user?.name || "",
      authorEmail: user?.email || "",
    }),
    messages: {
      success: "تم انشاء التعليق بنجاح",
      error: "حدث خطأ ما في انشاء التعليق",
    },
  });
}

import { updatePost } from "@/services/postsServices";
import useOptimisticUpdate from "../useOptimisticUpdate";

export default function useUpdatePost() {
  return useOptimisticUpdate<IPost, IPostPutData>({
    updateFn: updatePost,
    queryKey: ["posts"],
    matcher: (post, input) => post.id === input.id,
    updater: (post, input) => ({
      ...post,
      content: input.content,
    }),
    messages: {
      success: "تم تحديث المنشور بنجاح",
      error: "حدث خطأ في تحديث المنشور",
    },
  });
}

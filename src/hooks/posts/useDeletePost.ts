import { deletePost } from "@/services/postsServices";
import useOptimisticDelete from "../useOptimisticDelete";

export default function useDeletePost() {
  return useOptimisticDelete<IPost>({
    deleteFn: deletePost,
    queryKey: ["posts"],
    matcher: (post, id) => post.id === id,
    messages: {
      success: "تم حذف المنشور بنجاح",
      error: "حدث خطأ في حذف المنشور",
    },
  });
}

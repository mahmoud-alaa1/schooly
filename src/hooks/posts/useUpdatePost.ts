import { updatePost } from "@/services/postsServices";
import useOptimisticUpdate from "../useOptimisticUpdate";
import { useParams } from "next/navigation";

export default function useUpdatePost() {
  const { classroomId: id } = useParams();

  return useOptimisticUpdate<IPost, IPostPutData>({
    updateFn: updatePost,
    queryKey: id ? ["posts", id as string] : ["posts"],
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

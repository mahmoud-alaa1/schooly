import useOptimisticCreate from "../useOptimisticCreate";
import { useAuth } from "@/store/auth";
import { createPost } from "@/services/postsServices";
import useGetProfile from "../profile/useGetProfile";

export default function useCreatePost() {
  const user = useAuth((state) => state.user);
  const { data } = useGetProfile();
  return useOptimisticCreate<IPost, IPostPostData>({
    createFn: createPost,
    queryKey: ["posts"],
    optimisticData: (input) => ({
      authorId: user?.id || "",
      authorName: user?.name || "",
      classRoomId: input.classRoomId,
      comments: [],
      content: input.content,
      createdAt: new Date().toISOString(),
      id: Date.now(),
      profilePictureUrl: data?.data.profilePictureUrl
        ? (data?.data.profilePictureUrl ?? "")
        : "",
    }),
    messages: {
      success: "تم انشاء المنشور بنجاح",
      error: "حدث خطأ ما في انشاء المنشور",
    },
  });
}

import { IComments } from "@/types/posts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export default function useComments(comments: IComments[], postId: number) {
  const queryClient = useQueryClient();
  const commentsContent = comments?.map((comment) => comment.content);
  queryClient.setQueryData(["comments", postId], commentsContent);
  const session = useSession();
  // @ts-expect-error the token exists
  const token = session.data?.user?.token;
  return useMutation({
    mutationFn: async ({ newComment }: { newComment: string }) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/comment`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: newComment,
            postId,
          }),
        }
      );
      if (!response.ok) throw new Error("فشل إرسال التعليق");
      return response.json();
    },
    onMutate: async (data) => {
      const previousComments = queryClient.getQueryData(["comments", postId]);
      queryClient.setQueryData(["comments", postId], (old: string[]) => [
        ...old,
        data.newComment,
      ]);

      return { previousComments };
    },
    onError: (error, newComment, context) => {
      queryClient.setQueryData(["comments", postId], context?.previousComments);
    },
  });
}

import { IComments } from "@/types/posts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import useToken from "./useToken";

export default function useComments(comments: IComments[], postId: number) {
  const queryClient = useQueryClient();
  const commentsContent = comments?.map((comment) => comment.content);
  const [commentsState, setComments] = useState<string[]>(commentsContent);
  queryClient.setQueryData(["comments", postId], commentsContent);
  const token = useToken();

  const mutatedFunc = useMutation({
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
      setComments((prev) => [...prev, data.newComment]);
    },
    onError: (error, newComment, context) => {
      setComments((prev) => prev.slice(0, prev.length - 1));
    },
  });

  return { mutatedFunc, commentsState, setComments };
}

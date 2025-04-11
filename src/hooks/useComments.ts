import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { sendComment } from "@/services/comments";

export default function useComments(comments: IComments[]) {
  const [commentsState, setComments] = useState<IComments[]>(comments);

  const mutatedFunc = useMutation({
    mutationFn: (comment: { newComment: string; postId: number }) =>
      sendComment({
        newComment: comment.newComment,
        postId: comment.postId,
      }),
    onMutate: async (data) => {
      setComments((prev) => [
        ...prev,
        {
          authorId: "1",
          authorName: "User",
          content: data.newComment,
          createdAt: new Date().toISOString(),
          id: Math.floor(Math.random() * 10000),
        },
      ]);
    },
    onError: () => {
      setComments((prev) => prev.slice(0, prev.length - 1));
    },
    onSuccess: (data) => {
      console.log("Comment added successfully", data);
    },
  });

  return { mutatedFunc, commentsState, setComments };
}

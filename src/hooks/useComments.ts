import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { sendComment } from "@/services/comments";

export default function useComments(comments: IComments[]) {
  const commentsContent = comments?.map((comment) => comment.content);
  const [commentsState, setComments] = useState<string[]>(commentsContent);

  const mutatedFunc = useMutation({
    mutationFn: (comment: { newComment: string; postId: number }) =>
      sendComment(comment),
    onMutate: async (data) => {
      setComments((prev) => [...prev, data.newComment]);
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

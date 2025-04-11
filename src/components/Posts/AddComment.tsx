import { FormEvent, useState } from "react";

import { UseMutationResult } from "@tanstack/react-query";
import UserInput from "../UserInput";

interface IAddComment {
  mutatedFunc: UseMutationResult<
    unknown,
    Error,
    {
      newComment: string;
      postId: number;
    },
    void
  >;
  id: number;
}

export default function AddComment({ mutatedFunc, id }: IAddComment) {
  const [comment, setComment] = useState<string>("");
  const { error, isPending, mutate: sendComment } = mutatedFunc;
  const handleAddition = (e: FormEvent) => {
    e.preventDefault();
    sendComment({ newComment: comment.trim(), postId: id });
    if (!error) setComment("");
  };

  return (
    <UserInput
      error={error}
      id={`comment-id-${id}`}
      isPending={isPending}
      label="أضف تعليق هنا..."
      onSubmit={handleAddition}
      value={comment}
      setValue={setComment}
      
    />
  );
}

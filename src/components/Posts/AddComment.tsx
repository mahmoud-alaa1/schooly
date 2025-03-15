import React, { FormEvent } from "react";
import { AutosizeTextarea } from "../ui/AutoResizeTextArea";
import UserAvatar from "../ui/userAvatar";
import { AiOutlineSend } from "react-icons/ai";
import { Button } from "../ui/button";
import { UseMutationResult } from "@tanstack/react-query";

export default function AddComment({
  mutatedFunc,
  id,
}: {
  mutatedFunc: UseMutationResult<unknown, Error, { newComment: string }, void>;
  id: number;
}) {
  const [comment, setComment] = React.useState<string>("");
  const { error, isPending, mutate: addComment } = mutatedFunc;
  const handleAddition = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (comment.trim() === "") return;
    addComment({ newComment: comment.trim() });
    if (!error) setComment("");
  };
  return (
    <div className="bg-primary/10 border border-primary/25  rounded-xl p-3 grid grid-cols-[auto_1fr]   gap-3 ">
      <UserAvatar avatar={5} size={24} className="flex-grow-0" />
      <form
        className="flex gap-2"
        action=""
        onSubmit={(e) => handleAddition(e)}
      >
        <div className="flex h-fit w-full">
          <label htmlFor="comment-id-1">
            <strong className="text-xs hide">أضف تعليق</strong>
          </label>
          <AutosizeTextarea
            minHeight={1}
            disabled={isPending}
            id={`comment-id-${id}`}
            value={comment}
            placeholder="أضف تعليق هنا..."
            className="  bg-primary/0 flex-grow  border-none"
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
        </div>
        <Button
          disabled={isPending || comment.trim() === ""}
          size="nothing"
          type="submit"
          className=" border bg-primary-foreground rounded-full hover:bg-primary-foreground border-neutral-300 shadow-md py-1 px-[10px] h-fit"
        >
          <AiOutlineSend className="text-black text-base" />
        </Button>
      </form>
      {error && <p className="text-red-500 py-4">{error.message}</p>}
    </div>
  );
}

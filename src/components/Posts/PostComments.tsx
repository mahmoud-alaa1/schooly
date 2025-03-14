import React from "react";
import UserAvatar from "../ui/userAvatar";
import { Button } from "../ui/button";
import { IoIosMore } from "react-icons/io";
import { AiOutlineSend } from "react-icons/ai";
import { Textarea } from "../ui/textarea";
import { IPost } from "@/types/posts";
import useComments from "@/hooks/useComments";
import { useQueryClient } from "@tanstack/react-query";

export default function PostComments({ post }: { post: IPost }) {
  const [comment, setComment] = React.useState<string>("");

  const {
    error,
    isPending,
    mutate: addComment,
  } = useComments(post.comments, post.id);
  const queryClient = useQueryClient();
  const comments: string[] | undefined = queryClient.getQueryData([
    "comments",
    post.id,
  ]);
  const handleAddition = () => {
    if (comment.trim() === "") return;
    addComment({ newComment: comment.trim() });
    if (!error) setComment("");
  };

  return (
    <div className="flex flex-col gap-3 py-3 px-6 ">
      {comments?.map((comment, index) => (
        <div
          key={`${post.id} + ${index} + ${comment}`}
          className=" flex items-center justify-between "
        >
          <div className="flex items-center gap-2">
            <UserAvatar avatar={4} size={48}></UserAvatar>
            <div className="flex flex-col">
              <strong className="text-xs">نور محمد</strong>
              <span className="text-black/85 text-xs font-light">
                {comment}
              </span>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <IoIosMore />
          </Button>
        </div>
      ))}

      <div className="bg-primary/10 border border-primary/25 rounded-xl p-3 grid grid-cols-[auto_1fr_auto]   gap-3 ">
        <UserAvatar avatar={5} size={24} className="flex-grow-0"></UserAvatar>
        <div>
          <label htmlFor="comment-id-1">
            <strong className="text-xs hide">أضف تعليق</strong>
          </label>
          <Textarea
            disabled={isPending}
            id={`comment-id-${1}`}
            value={comment}
            placeholder="أضف تعليق هنا..."
            className=" border-none bg-primary/0 ring-0 flex-grow "
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <Button
          disabled={isPending || comment.trim() === ""}
          size="sm"
          className=" border bg-primary-foreground rounded-full hover:bg-primary-foreground border-neutral-300 shadow-md "
          onClick={handleAddition}
        >
          <AiOutlineSend className="text-black text-base" />
        </Button>
      </div>
      {error && <p className="text-red-500 py-4">{error.message}</p>}
    </div>
  );
}

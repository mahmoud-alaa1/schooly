import React, { FormEvent } from "react";
import UserAvatar from "../ui/userAvatar";
import { Button } from "../ui/button";
import { IoIosMore } from "react-icons/io";
import { AiOutlineSend } from "react-icons/ai";
import { Textarea } from "../ui/textarea";
import { IPost } from "@/types/posts";
import useComments from "@/hooks/useComments";
import { AutosizeTextarea } from "../ui/AutoResizeTextArea";

export default function PostComments({ post }: { post: IPost }) {
  const [comment, setComment] = React.useState<string>("");

  const {
    mutatedFunc: { error, isPending, mutate: addComment },
    commentsState,
  } = useComments(post.comments, post.id);

  const handleAddition = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (comment.trim() === "") return;
    addComment({ newComment: comment.trim() });
    if (!error) setComment("");
  };
  console.log(comment);

  return (
    <div className="flex flex-col gap-3 py-3 px-6 ">
      {commentsState?.map((comment, index) => (
        <div
          key={`${post.id} + ${index} `}
          className=" grid grid-cols-[auto_1fr_auto] items-center w-full gap-2"
        >
          <UserAvatar avatar={4} size={48}></UserAvatar>
          <div className="flex flex-col flex-grow text-wrap flex-wrap">
            <strong className="text-xs">نور محمد</strong>
            <div dir="auto" className="text-black/85 text-xs font-light    break-all">
              {comment}
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <IoIosMore />
          </Button>
        </div>
      ))}

      <div className="bg-primary/10 border border-primary/25  rounded-xl p-3 grid grid-cols-[auto_1fr_auto]   gap-3 ">
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
              id={`comment-id-${post.id}`}
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
            size="sm"
            type="submit"
            className=" border bg-primary-foreground rounded-full hover:bg-primary-foreground border-neutral-300 shadow-md py-1"
          >
            <AiOutlineSend className="text-black text-base" />
          </Button>
        </form>
      </div>
      {error && <p className="text-red-500 py-4">{error.message}</p>}
    </div>
  );
}

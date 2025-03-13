import React from "react";
import UserAvatar from "../ui/userAvatar";
import { Button } from "../ui/button";
import { IoIosMore } from "react-icons/io";
import { AiOutlineSend } from "react-icons/ai";
import { Textarea } from "../ui/textarea";
import { IComments } from "@/types/posts";

export default function PostComments({ comments }: { comments: IComments[] }) {
  return (
    <div className="flex flex-col gap-3 py-3 px-6 ">
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-2">
          <UserAvatar avatar={3} size={48}></UserAvatar>
          <div className="flex flex-col">
            <strong className="text-xs">أيمن أحمد</strong>
            <span className="text-black/85 text-xs font-light">
              برجاء تأخير المعاد نصف ساعة 👍
            </span>
          </div>
        </div>
        <Button variant="ghost" size="sm">
          <IoIosMore />
        </Button>
      </div>
      <div className=" flex items-center justify-between ">
        <div className="flex items-center gap-2">
          <UserAvatar avatar={4} size={48}></UserAvatar>
          <div className="flex flex-col">
            <strong className="text-xs">نور محمد</strong>
            <span className="text-black/85 text-xs font-light">
              المعاد غير مناسب{" "}
            </span>
          </div>
        </div>
        <Button variant="ghost" size="sm">
          <IoIosMore />
        </Button>
      </div>
      <div className="bg-primary/10 border border-primary/25 rounded-xl p-3 grid grid-cols-[auto_1fr_auto]   gap-3 ">
        <UserAvatar avatar={5} size={24} className="flex-grow-0"></UserAvatar>
        <div>
          <label htmlFor="comment-id-1">
            <strong className="text-xs hide">أضف تعليق</strong>
          </label>
          <Textarea
            id={`comment-id-${1}`}
            placeholder="أضف تعليق هنا..."
            className=" border-none bg-primary/0 ring-0 flex-grow "
          />
        </div>
        <Button
          size="sm"
          className=" border bg-primary-foreground rounded-full hover:bg-primary-foreground border-neutral-300 shadow-md  "
        >
          <AiOutlineSend className="text-black text-base" />
        </Button>
      </div>
    </div>
  );
}

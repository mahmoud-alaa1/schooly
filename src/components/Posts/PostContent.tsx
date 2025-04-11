import React from "react";
import UserAvatar from "../ui/userAvatar";
import { Button } from "../ui/button";
import { IoIosMore } from "react-icons/io";
import { formatDistanceToNow } from "date-fns";
import { ar } from "date-fns/locale";

export default function PostContent({ post }: { post: IPost }) {
  const timeAgo = formatDistanceToNow(post.createdAt, {
    addSuffix: true,
    locale: ar,
  });
  return (
    <div className="flex gap-4 p-6 border-b-neutral-100 border-b-2 flex-col">
      <div className="flex justify-between w-full items-center">
        <div className="flex items-center gap-2">
          <UserAvatar avatar={5} size={48}></UserAvatar>
          <div className="flex flex-col">
            <strong className="text-xs">{post.authorName}</strong>
          </div>
        </div>
        <Button variant="ghost" size="sm">
          <IoIosMore />
        </Button>
      </div>
      <div>
        <span className="text-xs">{post.content}</span>
      </div>
      <div>
        <span className="text-neutral-400">{timeAgo}</span>
      </div>
    </div>
  );
}

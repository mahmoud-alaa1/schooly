import React from "react";

import PostContent from "./PostContent";
import PostComments from "./PostComments";
import { IComments } from "@/types/posts";

export default function Post({
  content,
  comments,
}: {
  content: string;
  comments: IComments[];
}) {
  return (
    <div className="bg-primary-foreground rounded-2xl border border-neutral-100 text-xs">
      <PostContent content={content} />
      <PostComments comments={comments} />
    </div>
  );
}

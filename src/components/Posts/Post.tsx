import React from "react";

import PostContent from "./PostContent";
import PostComments from "./PostComments";
import { IComments, IPost } from "@/types/posts";

export default function Post({ post }: { post: IPost }) {
  return (
    <div className="bg-primary-foreground rounded-2xl border border-neutral-100 text-xs">
      <PostContent post={post} />
      <PostComments comments={post.comments} />
    </div>
  );
}

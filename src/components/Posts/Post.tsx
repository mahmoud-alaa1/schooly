import React from "react";

import PostContent from "./PostContent";
import PostComments from "./PostComments";

export default function Post() {
  return (
    <div className="bg-primary-foreground rounded-2xl border border-neutral-100 text-xs">
      <PostContent />
      <PostComments />
    </div>
  );
}

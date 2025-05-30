"use client";

import { useState } from "react";
import CommentDisplay from "./CommentDisplay";
import CommentEdit from "./CommentEdit";

export default function CommentItem({
  comment,
  postId,
}: {
  comment: IComment;
  postId: string | number;
}) {
  const [isEditing, setIsEditing] = useState(false);

  return isEditing ? (
    <CommentEdit />
  ) : (
    <CommentDisplay
      onEdit={() => setIsEditing(true)}
      comment={comment}
      postId={postId}
    />
  );
}

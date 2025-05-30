"use client";

import Image from "next/image";
import ActionsMenu from "../ActionsMenu";
import useDeleteComment from "@/hooks/comments/useDeleteComment";
import { useAuth } from "@/store/auth";

export default function CommentDisplay({
  comment,
  postId,
  onEdit,
}: {
  comment: IComment;
  onEdit: () => void;
  postId: string | number;
}) {
  const { mutate: deleteComment } = useDeleteComment(postId);
  const user = useAuth((state) => state.user);

  return (
    <div className="flex justify-between gap-3">
      <div className="flex items-start gap-2">
        <div className="relative size-12 shrink-0 rounded-full bg-orange-500">
          <Image
            src="/person1.png"
            alt={`صورة ${comment.authorName}`}
            fill
            className="rounded-full object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="flex flex-col gap-1 break-words">
          <span className="font-semibold">{comment.authorName}</span>
          <span className="text-sm text-gray-500">{comment.content}</span>
        </div>
      </div>
      {comment.authorId === user?.id && (
        <ActionsMenu
          onEdit={onEdit}
          onDelete={() => deleteComment(comment.id)}
        />
      )}
    </div>
  );
}

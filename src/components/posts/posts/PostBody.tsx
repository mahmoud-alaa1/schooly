"use client";

import { BoxBody } from "@/components/Box";
import { getDistanceToNow } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import PostEdit from "./PostEdit";
import ActionsMenu from "../ActionsMenu";
import useDeletePost from "@/hooks/posts/useDeletePost";
import RoleGuard from "@/components/RoleGuard";

export default function PostBody({ post }: { post: IPost }) {
  const [isEditing, setIsEditing] = useState(false);
  const { mutate: deletePost } = useDeletePost();

  return (
    <BoxBody className="flex flex-col gap-4 border-b py-6">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <div className="relative size-12 rounded-full bg-orange-500">
            <Image
              src="/person1.png"
              alt={`صورة ${post.authorName}`}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <span className="font-semibold">{post.authorName}</span>
        </div>
        <RoleGuard role="OWNER" ownerId={post.authorId}>
          <ActionsMenu
            onDelete={() => deletePost(post.id)}
            onEdit={() => setIsEditing(true)}
          />
        </RoleGuard>
      </div>
      {isEditing ? (
        <PostEdit post={post} cancelEdit={() => setIsEditing(false)} />
      ) : (
        <p className="overflow-wrap-anywhere break-words whitespace-pre-wrap">
          {post.content}
        </p>
      )}
      <span className="text-muted-foreground">
        {getDistanceToNow(post.createdAt)}
      </span>
    </BoxBody>
  );
}

import React from "react";
import { Box, BoxBody, BoxHeader } from "../Box";
import PostHeader from "./PostHeader";
import Image from "next/image";
import { getDistanceToNow } from "@/lib/utils";
import PostCommentsList from "./comments/PostCommentsList";
import CreateCommet from "./comments/CreateCommet";

export default function PostItem({ post }: { post: IPost }) {
  return (
    <Box dir="rtl">
      <BoxHeader className="bg-[#FAFAFA]">
        <PostHeader classroomId={post.classRoomId} />
      </BoxHeader>
      <BoxBody className="flex flex-col gap-4 border-b py-6">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <div className="relative size-12 rounded-full bg-orange-500">
              <Image
                src="/person1.png"
                alt={`صورة ${post.authorName}`}
                fill
                className="rounded-full object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <span className="font-semibold">{post.authorName}</span>
          </div>
        </div>
        <p>{post.content}</p>
        <span className="text-muted-foreground">
          {getDistanceToNow(post.createdAt)}
        </span>
      </BoxBody>
      <BoxBody className="flex flex-col gap-4">
        {post.comments.length > 0 && <PostCommentsList postId={post.id} />}
        <CreateCommet postId={post.id} />
      </BoxBody>
    </Box>
  );
}

import React from "react";
import { Box, BoxBody, BoxHeader } from "../Box";
import PostHeader from "./posts/PostHeader";
import PostCommentsList from "./comments/PostCommentsList";
import CreateCommet from "./comments/CreateCommet";
import PostBody from "./posts/PostBody";

export default function PostItem({ post }: { post: IPost }) {
  return (
    <Box dir="rtl">
      <BoxHeader className="flex items-center justify-between bg-[#FAFAFA]">
        <PostHeader classroomId={post.classRoomId} />
      </BoxHeader>
      <PostBody post={post} />

      <BoxBody className="flex flex-col gap-4">
        {post.comments.length > 0 && <PostCommentsList postId={post.id} />}
        <CreateCommet postId={post.id} />
      </BoxBody>
    </Box>
  );
}

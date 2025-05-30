"use client";

import useGetAllPosts from "@/hooks/posts/useGetAllPosts";
import PostItem from "./PostItem";
import PostSkeleton from "./PostSkeleton";

export default function PostsList() {
  const { data, isFetchingNextPage, isPending, error, ref } = useGetAllPosts();
  const posts = data?.pages.flatMap((page) => page.data);

  console.log(isFetchingNextPage);

  return (
    <div className="flex flex-col gap-4">
      {posts?.map((post, index) => (
        <div key={post.id} ref={index === posts.length - 1 ? ref : undefined}>
          <PostItem post={post} />
        </div>
      ))}
      {(isFetchingNextPage || isPending) && <PostSkeleton />}
    </div>
  );
}

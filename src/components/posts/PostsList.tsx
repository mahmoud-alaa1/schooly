"use client";

import useGetAllPosts from "@/hooks/posts/useGetAllPosts";
import PostItem from "./PostItem";
import PostSkeleton from "./PostSkeleton";
import { POSTS_PER_PAGE } from "@/lib/constants";

export default function PostsList() {
  const { data, isFetching, ref, hasNextPage } = useGetAllPosts();
  const posts = data?.pages.flatMap((page) => page.data);

  console.log("iam posts", posts);

  return (
    <div className="flex flex-col gap-4">
      {posts?.map((post, index) => (
        <div key={post.id} ref={index === posts.length - 1 ? ref : undefined}>
          <PostItem post={post} />
        </div>
      ))}
      {isFetching && (
        <>
          {Array.from({ length: POSTS_PER_PAGE }).map((_, i) => (
            <PostSkeleton key={i} />
          ))}
        </>
      )}
      {!hasNextPage && (
        <div className="flex items-center justify-center rounded-2xl bg-white p-6">
          <p className="text-muted-foreground">لا توجد منشورات اخرى لعرضها</p>
        </div>
      )}
    </div>
  );
}

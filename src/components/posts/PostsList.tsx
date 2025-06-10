"use client";

import useGetAllPosts from "@/hooks/posts/useGetAllPosts";
import PostItem from "./PostItem";
import PostSkeleton from "./PostSkeleton";
import { POSTS_PER_PAGE } from "@/lib/constants";

export default function PostsList() {
  const { data, isFetching, ref } = useGetAllPosts();
  const posts = data?.pages.flatMap((page) => page.data);

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
      {posts?.length === 0 && !isFetching && (
        <div className="flex bg-white p-6 rounded-2xl items-center justify-center">
          <p className="text-red-500">لا توجد منشورات لعرضها</p>
        </div>
      )}
    </div>
  );
}

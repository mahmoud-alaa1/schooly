"use client";

import Post from "./Post";
import usePosts from "@/hooks/usePosts";
import PostSkeleton from "./PostSkeleton";

export default function Posts() {
  const { data, lastPostElementRef, error, isPending, isFetchingNextPage } =
    usePosts();
  return (
    <div className="flex flex-col gap-4">
      {data?.pages.map((posts, firstIndex) =>
        posts.data.map((post, secondIndex) =>
          firstIndex === data.pages.length - 1 &&
          secondIndex === posts.data.length - 1 ? (
            <div key={post.id} ref={lastPostElementRef}>
              <Post post={post} />
            </div>
          ) : (
            <Post key={post.id} post={post} />
          )
        )
      )}
      {(isPending || isFetchingNextPage) && <PostSkeleton />}
      {error && (
        <p className="text-center text-red-500 py-4">{error.message}</p>
      )}
    </div>
  );
}

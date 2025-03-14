"use client";

import Post from "./Post";
import usePosts from "@/hooks/usePosts";
import PostSkeleton from "./PostSkeleton";

export default function Posts() {
  const { error, loading, posts, lastPostElementRef } = usePosts();
  console.log(posts);
  return (
    <div className="flex flex-col gap-4">
      {posts?.map((post, index) =>
        posts?.length === index + 1 ? (
          <div key={post.id + `${index}`} ref={lastPostElementRef}>
            <Post post={post} />
          </div>
        ) : (
          <Post key={post.id} post={post} />
        )
      )}
      {loading && <PostSkeleton />}
      {error && <p className="text-center text-red-500 py-4">{error}</p>}
    </div>
  );
}

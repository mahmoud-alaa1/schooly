"use client";

import { useCallback, useRef, useState } from "react";
import Post from "./Post";
import usePosts from "@/hooks/usePosts";
import PostSkeleton from "./PostSkeleton";

export default function Posts() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const observer = useRef<IntersectionObserver | null>(null);
  console.log(currentPage);
  const { posts, loading, error, hasMore } = usePosts(currentPage);
  const lastPostElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            setCurrentPage((prevPage) => prevPage + 1);
          }
        },
        { threshold: 0.8 }
      );
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );
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

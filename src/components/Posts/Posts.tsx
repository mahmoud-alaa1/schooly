"use client";

import { useCallback, useRef, useState } from "react";
import Post from "./Post";
import usePosts from "@/hooks/usePosts";

export default function Posts() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const observer = useRef<IntersectionObserver | null>(null);

  const { data: posts, error, isLoading } = usePosts(currentPage);
  const lastPostElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            setCurrentPage((prevPage) => prevPage + 1);
          }
        },
        { threshold: 1.0 }
      );
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );
  console.log(posts?.data);
  return (
    <div className="flex flex-col gap-4">
      <Post />
      <Post />
      <Post />
      <Post />
      {posts?.data.map((post, index) => {
        if (posts?.data.length === index + 1) {
          return (
            <div
              ref={lastPostElementRef}
              key={post.id}
              className="border-b py-4"
            >
              1
            </div>
          );
        } else {
          return <Post key={post.id} />;
        }
      })}
      {isLoading && <p className="text-center py-4">Loading...</p>}
      {error && (
        <p className="text-center text-red-500 py-4">{error.message}</p>
      )}
    </div>
  );
}

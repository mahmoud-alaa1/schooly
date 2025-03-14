import { IPost, IPostsResponse } from "@/types/posts";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useRef, useState } from "react";
import useToken from "./useToken";
import { useQuery } from "@tanstack/react-query";
export default function usePosts() {
  const token = useToken();
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const observer = useRef<IntersectionObserver | null>(null);
  const fetchPosts = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/post/all?Page=${currentPage}&PageSize=3`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      ).then((res) => res.json() as Promise<IPostsResponse>);

      if (response.meta.totalPages === currentPage) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const res = useQuery({
    queryKey: ["posts", currentPage],
    queryFn: () => {
      if (token) {
        return fetchPosts();
      } else
        return new Promise((resolve, reject) => {
          resolve({ data: [], meta: { totalPages: 0 } });
        });
    },
  });
  const lastPostElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (res.isLoading) return;
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
    [res.isLoading, hasMore]
  );

  return { res, lastPostElementRef };
}

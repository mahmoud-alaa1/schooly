import { IPostsResponse } from "@/types/posts";
import { useCallback, useEffect, useRef, useState } from "react";
import useToken from "./useToken";
export default function usePosts() {
  const token = useToken();
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const observer = useRef<IntersectionObserver | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>("");
  const [posts, setPosts] = useState<IPostsResponse["data"]>([]);
  console.log(currentPage);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/post/all?Page=${currentPage}&PageSize=3`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const text = await response.text();
        if (!text) {
          throw new Error("Empty response received from server");
        }

        const data: IPostsResponse = JSON.parse(text);

        setPosts((prevPosts) => [...prevPosts, ...data.data]);
        if (data.meta.totalPages === currentPage) {
          setHasMore(false);
        }
      } catch (error) {
        if (error instanceof Error) setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage, token]);
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
    [hasMore, loading]
  );

  return { posts, lastPostElementRef, error, loading };
}

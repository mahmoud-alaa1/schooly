import { IPost, IPostsResponse } from "@/types/posts";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function usePosts(currentPage: number) {
  const session = useSession();
  const token = session.data?.user?.token;

  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    if (!token) return; // Prevent fetching if token is undefined

    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/post/all?Page=${currentPage}&PageSize=1`,
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

        // Ensure response is not empty before parsing JSON
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
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage, token]);

  return { posts, loading, error, hasMore };
}

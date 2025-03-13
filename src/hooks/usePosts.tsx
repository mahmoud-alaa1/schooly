import { IPostsResponse } from "@/types/posts";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRef } from "react";

export default function usePosts(currentPage: number = 1) {
  const queryClient = useQueryClient();
  const session = useSession();

  const fetchPosts = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/post/all?Page=${currentPage}&PageSize=4`,
      {
        headers: {
          // @ts-expect-error the token exists
          Authorization: `Bearer ${session.data?.user?.token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json() as Promise<IPostsResponse>;
  };

  const res = useQuery({
    queryKey: ["posts", currentPage],
    staleTime: 1000 * 60 * 5,
    queryFn: () => fetchPosts(),
  });
  if (res.data) {
    if (currentPage < res.data.meta.totalPages) {
      queryClient.prefetchQuery({
        staleTime: 1000 * 60 * 5,

        queryKey: ["posts", currentPage + 1],
        queryFn: () => fetchPosts(),
      });
    }
    if (currentPage > 1) {
      queryClient.prefetchQuery({
        staleTime: 1000 * 60 * 5,
        queryKey: ["posts", currentPage - 1],
        queryFn: () => fetchPosts(),
      });
    }
  }
  return res;
}

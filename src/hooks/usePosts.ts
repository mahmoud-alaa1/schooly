import { useCallback, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getPosts } from "@/services/posts";
export default function usePosts() {
  const observer = useRef<IntersectionObserver | null>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    error,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam = 1 }) => getPosts(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      const nextPage =
        lastPageParam === lastPage.meta.totalPages ? null : lastPageParam + 1;
      return nextPage;
    },
  });

  const lastPostElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isPending) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasNextPage) {
            fetchNextPage();
          }
        },
        { threshold: 0.8 }
      );
      if (node) observer.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isPending]
  );

  return { data, lastPostElementRef, error, isPending, isFetchingNextPage };
}

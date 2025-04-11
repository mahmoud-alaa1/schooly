import { getLessons } from "@/services/upcomingLessons";
import { useInfiniteQuery } from "@tanstack/react-query";
export default function useUpcomingLessons() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    error,
  } = useInfiniteQuery({
    queryKey: ["upcominglessons"],
    queryFn: ({ pageParam = 1 }) => getLessons({ page: pageParam }),

    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      const nextPage =
        lastPageParam === lastPage.meta.totalPages ? null : lastPageParam + 1;
      return nextPage;
    },
  });

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    error,
  };
}

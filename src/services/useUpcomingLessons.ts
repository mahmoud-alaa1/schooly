import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export default function useUpcomingLessons(currentPage: number) {
  const session = useSession();
  const queryClient = useQueryClient();

  function getUpcomingLessons() {
    try {
      const res = fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/lesson/upcoming?PageSize=12&Page=${currentPage}&classRoomId=e082bf29-033a-4b1f-bdc4-08dd584749a7`,
        {
          headers: {
            // @ts-expect-error the token exists
            Authorization: `Bearer ${session.data?.user?.token}`,
            "Content-Type": "application/json",
          },
        }
      ).then((res) => res.json());
      return res;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unexpected error occurred");
    }
  }
  const res = useQuery({
    queryKey: ["upcomingLessons", currentPage],
    staleTime: 1000 * 60 * 5,
    queryFn: () => getUpcomingLessons(),
  });
  if (res.data) {
    if (currentPage < res.data?.meta?.totalPages) {
      queryClient.prefetchQuery({
        staleTime: 1000 * 60 * 5,

        queryKey: ["upcomingLessons", currentPage + 1],
        queryFn: () => getUpcomingLessons(),
      });
    }
    if (currentPage > 1) {
      queryClient.prefetchQuery({
        staleTime: 1000 * 60 * 5,

        queryKey: ["upcomingLessons", currentPage - 1],
        queryFn: () => getUpcomingLessons(),
      });
    }
  }

  return res;
}

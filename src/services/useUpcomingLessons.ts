import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export default function useUpcomingLessons(currentPage: number) {
  const session = useSession();
  function getUpcomingLessons() {
    try {
      const res = fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/lesson/upcoming?PageSize=3&Page=${currentPage}`,
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
    queryKey: ["upcomingLessons"],
    queryFn: () => getUpcomingLessons(),
  });

  return res;
}

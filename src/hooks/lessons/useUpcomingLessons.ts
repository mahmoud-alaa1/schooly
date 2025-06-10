import useInfinite from "../useInfinite";
import { getUpcomingLessons } from "@/services/lessonServices";

export default function useUpcomingLessons(refetchInterval?: number) {
  const res = useInfinite({
    queryKey: ["upcoming-lessons"],
    refetchInterval,
    fetchFn: async (pageNumber: number) => {
      return await getUpcomingLessons({
        Page: pageNumber,
        Status: "Upcoming",
      });
    },
  });
  return res;
}

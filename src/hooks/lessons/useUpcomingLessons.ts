import useInfinite from "../useInfinite";
import { getLessons } from "@/services/lessonServices";

export default function useUpcomingLessons(refetchInterval?: number) {
  const res = useInfinite({
    queryKey: ["upcoming-lessons"],
    refetchInterval,
    fetchFn: async (pageNumber: number) => {
      return await getLessons({
        Page: pageNumber,
        Status: "Upcoming",
      });
    },
  });
  return res;
}

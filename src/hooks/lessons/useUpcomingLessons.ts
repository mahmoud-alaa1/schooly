import useInfinite from "../useInfinite";
import { getUpcomingLessons } from "@/services/lessonServices";

export default function useUpcomingLessons() {
  const res = useInfinite({
    queryKey: ["upcoming-lessons"],
    fetchFn: async (pageNumber: number) => {
      return await getUpcomingLessons({
        Page: pageNumber,
        Status: "Upcoming",
      });
    },
  });
  return res;
}

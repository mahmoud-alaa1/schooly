import { TLessonStatus } from "@/types/lessons";
import useInfinite from "../useInfinite";
import { getLessons } from "@/services/lessonServices";

export default function useGetAllLessons(
  classroom: string | undefined,
  status: TLessonStatus | undefined,
) {
  const res = useInfinite({
    queryKey: [
      "lessons",
      classroom === undefined ? "" : classroom,
      status === undefined ? "" : status,
    ],
    fetchFn: async (pageNumber: number) => {
      return await getLessons({
        Page: pageNumber,
        Status: status,
        classRoomId: classroom,
      });
    },
  });
  return res;
}

import { getHomeworks } from "@/services/homeworksServices";
import useInfinite from "../useInfinite";

export default function useGetAllHomeworks(
  Key?: string[],
  ClassRoomId?: string,
) {
  const res = useInfinite({
    queryKey: ClassRoomId
      ? ["homeworks", ClassRoomId]
      : ["homeworks", ...(Key || [])],
    fetchFn: async (pageNumber: number) => {
      return await getHomeworks({
        page: pageNumber,
        ClassRoomId,
      });
    },
  });
  return res;
}

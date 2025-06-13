import { getHomeworks } from "@/services/homeworksServices";
import useInfinite from "../useInfinite";

export default function useGetAllHomeworks(ClassRoomId?: string) {
  const res = useInfinite({
    queryKey: ClassRoomId ? ["homeworks", ClassRoomId] : ["homeworks"],
    fetchFn: async (pageNumber: number) => {
      return await getHomeworks({
        page: pageNumber,
        ClassRoomId,
      });
    },
  });
  return res;
}

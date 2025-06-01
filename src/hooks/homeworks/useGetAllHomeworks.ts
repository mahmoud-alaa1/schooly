import { getHomeworks } from "@/services/homeworks";
import useInfinite from "../useInfinite";

export default function useGetAllHomeworks() {
  const res = useInfinite({
    queryKey: ["homeworks"],
    fetchFn: async (pageNumber: number) => {
      return await getHomeworks({
        page: pageNumber,
      });
    },
  });
  return res;
}

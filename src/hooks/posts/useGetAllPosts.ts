import { getAllPosts } from "@/services/postsServices";
import useInfinite from "../useInfinite";

export default function useGetAllPosts() {
  const res = useInfinite<IPost>({
    queryKey: ["posts"],
    fetchFn: async (pageNumber: number) => {
      return await getAllPosts({
        Page: pageNumber,
      });
    },
  });
  return res;
}

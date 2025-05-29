import { getComments } from "@/services/commentsServices";
import useInfinite from "../useInfinite";

export default function useGetComment({ postId }: { postId: string | number }) {
  const res = useInfinite<IComment>({
    queryKey: ["comments", postId as string],
    fetchFn: async (pageNumber: number) => {
      return await getComments({ postId, page: pageNumber });
    },
  });
  return res;
}

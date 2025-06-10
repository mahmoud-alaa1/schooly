import { getAllPosts } from "@/services/postsServices";
import useInfinite from "../useInfinite";
import { useParams } from "next/navigation";

export default function useGetAllPosts() {
  const { classroomId: id } = useParams();

  const res = useInfinite<IPost>({
    queryKey: id ? ["posts", id as string] : ["posts"],
    fetchFn: async (pageNumber: number) => {
      return await getAllPosts({
        Page: pageNumber,
        ClassRoomId: id as string,
      });
    },
  });
  return res;
}

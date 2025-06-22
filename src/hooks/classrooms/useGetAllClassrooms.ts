import { getAllClassrooms } from "@/services/classroomsServices";
import { useQuery } from "@tanstack/react-query";

export default function useGetAllClassrooms() {
  return useQuery({
    queryKey: ["classrooms"],
    queryFn: async () => {
      return await getAllClassrooms({});
    },
  });
}

import { getSingleClassroom } from "@/services/classroomsServices";
import { useQuery } from "@tanstack/react-query";

export default function useGetSingleClassroom(id: string) {
  const res = useQuery({
    queryKey: ["classroom", id],
    queryFn: async () => await getSingleClassroom(id),
  });
  return res;
}

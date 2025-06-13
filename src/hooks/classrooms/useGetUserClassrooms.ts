import { getUserClassrooms } from "@/services/classroomsServices";
import { useAuth } from "@/store/auth";
import { useQuery } from "@tanstack/react-query";

export default function useGetUserClassrooms() {
  const id = useAuth((state) => state.user?.id);
  return useQuery({
    queryKey: id ? ["classrooms", id] : ["classrooms"],
    queryFn: getUserClassrooms,
  });
}

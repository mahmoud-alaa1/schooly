import { getAllClassrooms } from "@/services/classroomsServices";
import { useQuery } from "@tanstack/react-query";

export default function useGetAllClassrooms() {
  return useQuery({
    queryKey: ["classrooms"],
    queryFn: getAllClassrooms,
    staleTime: 1000 * 60 * 5, // Data will be considered fresh for 5 minutes
    gcTime: 1000 * 60 * 30, // Cache will be kept for 30 minutes
  });
}

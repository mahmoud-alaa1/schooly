import { getSingleClassroom } from "@/services/classroomsServices";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function useGetSingleClassroom(passedId?: string) {
  const { classroomId } = useParams();

  const id = passedId ?? (classroomId as string);

  const res = useQuery({
    queryKey: ["classroom", id],
    queryFn: async () => await getSingleClassroom(id),
  });
  return res;
}

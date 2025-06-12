import { getSingleLesson } from "@/services/lessonServices";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function useSingleLesson({
  id: lessonIdParam,
}: {
  id?: number | string;
}) {
  const { lessonId } = useParams();

  const id = lessonIdParam || (lessonId as string);
  return useQuery({
    queryKey: ["lesson", id],
    queryFn: async () => getSingleLesson(id),
  });
}

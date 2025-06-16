import { getSubmittedStudents } from "@/services/homeworksServices";
import useInfinite from "../useInfinite";

export default function useGetSubmittedStudents(homeworkId: string) {
  const res = useInfinite({
    queryKey: ["homeworks", homeworkId, "submittedStudents"],
    fetchFn: async () => {
      return await getSubmittedStudents(homeworkId);
    },
  });
  return res;
}

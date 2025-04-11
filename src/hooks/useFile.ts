import { useQuery } from "@tanstack/react-query";
import useToken from "./useToken";
import { getAllFiles } from "@/services/upload";

function useFile() {
  const token = useToken();
  const { data, error, isLoading } = useQuery({
    queryKey: ["homeworkFiles"],
    queryFn: () => getAllFiles(token),
    staleTime: 1000 * 60 * 5,
  });

  return { data, error, isLoading };
}

export default useFile;

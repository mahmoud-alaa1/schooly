import { getHomeworks } from "@/services/homework";
import { useQuery } from "@tanstack/react-query";

const useHomeworks = (currentPage: number, classRoomId?: string) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["homeworks", currentPage, classRoomId],
    staleTime: 1000 * 60 * 5,
    queryFn: () => getHomeworks(currentPage, classRoomId),
  });
  return {
    data,
    error,
    isLoading,
  };
};

export default useHomeworks;

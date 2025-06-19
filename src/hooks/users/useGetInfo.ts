import { getInfo } from "@/services/userServices";
import { useQuery } from "@tanstack/react-query";

export default function useGetInfo(id: string) {
  return useQuery({
    queryKey: ["user-info", id],
    queryFn: async () => getInfo(id),
  });
}

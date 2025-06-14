import { getProfile } from "@/services/profileServices";
import { useAuth } from "@/store/auth";
import { useQuery } from "@tanstack/react-query";

export default function useGetProfile() {
  const id = useAuth((state) => state.user?.id);
  return useQuery({
    queryKey: ["profile", id],
    queryFn: getProfile,
  });
}

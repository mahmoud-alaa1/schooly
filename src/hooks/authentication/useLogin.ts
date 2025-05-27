import { useMutation } from "@tanstack/react-query";
import { loginSchema } from "@/schemas/loginSchema";
import { useAuth } from "@/store/auth";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
export default function useLogin() {
  const { login } = useAuth();
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async (data: loginSchema) => {
      const res = await api.post<ILoginResponse>(
        `http://localhost:3000/api/auth/login`,
        data
      );

      return res.data;
    },
    onSuccess: (data) => {
      router.push("/");
      login(data.data);
    },
    onError: (error) => {
      console.error(error);
    },
  });
  return mutation;
}

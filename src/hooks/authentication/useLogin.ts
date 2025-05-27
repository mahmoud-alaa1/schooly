import { useMutation } from "@tanstack/react-query";
import { loginSchema } from "@/schemas/loginSchema";
import { useAuth } from "@/store/auth";
import { useRouter } from "next/navigation";
export default function useLogin() {
  const { login } = useAuth();
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async (data: loginSchema) => {
      const res = await fetch(`/api/auth/login`, {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("فشل تسجيل الدخول");
      return res.json() as Promise<ILoginResponse>;
    },
    onSuccess: (data) => {
      console.log(data);
      router.push("/");
      login(data.data);
    },
    onError: (error) => {
      console.error(error);
    },
  });
  return mutation;
}

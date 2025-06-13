import { useMutation } from "@tanstack/react-query";
import { loginSchema } from "@/schemas/loginSchema";
import { useAuth } from "@/store/auth";
import { useRouter } from "next/navigation";
import { ILoginResponse } from "@/types/login";
import { toast } from "sonner";
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
      router.push("/");
      localStorage.setItem("token", data.token);
      login(data.data);
      toast.success("تم تسجيل الدخول بنجاح");
    },
    onError: (error) => {
      console.error(error);
      toast.error(
        "فشل تسجيل الدخول، يرجى التحقق من البريد الإلكتروني وكلمة المرور الخاصة بك",
      );
    },
  });
  return mutation;
}

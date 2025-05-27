import { useMutation } from "@tanstack/react-query";
import { loginSchema } from "@/schemas/loginSchema";
import { login } from "@/services/authenticationServices";
export default function useLogin() {
  const mutation = useMutation({
    mutationFn: async (data: loginSchema) => {
      return await login(data);
    },
    onSuccess: (data) => {
      console.log(data);
      localStorage.setItem("token", data.token);
    },
    onError: (error) => {
      console.error(error);
    },
  });
  return mutation;
}

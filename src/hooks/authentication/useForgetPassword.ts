import { forgetPasswordSchema } from "@/schemas/forgetPasswordSchema";
import { forgetPasswordService } from "@/services/authenticationServices";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

function useForgetPassword() {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async (data: forgetPasswordSchema) => {
      return await forgetPasswordService(data);
    },
    onSuccess: (data, variables) => {
      console.log(data.message); // Handle success, e.g., show a success message
      // or redirect the user to a different page

      router.push(`/auth/verify-code?email=${variables.email}`);
    },
    onError: (error) => {
      console.log("Error during password reset:", error);
    },
  });
  return mutation;
}

export default useForgetPassword;

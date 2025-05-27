import { verifyCodeService } from "@/services/authenticationServices";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

function useVerifyCode() {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: verifyCodeService,
    onSuccess: (data, variables) => {
      console.log(data.message); // Handle success, e.g., show a success message
      // or redirect the user to a different page

      router.push(`/auth/reset-password?email=${variables.email}`);
    },
    onError: (error) => {
      console.log("Error during verify code:", error);
    },
  });
  return mutation;
}

export default useVerifyCode;

import { resetPasswordService } from "@/services/authenticationServices";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

function useResetPassword() {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: resetPasswordService,
    onSuccess: (data) => {
      console.log(data.message); // Handle success, e.g., show a success message
      // or redirect the user to a different page

      router.push("/auth/login?message=password-reset-successful");
    },
    onError: (error) => {
      console.log("Error during verify code:", error);
    },
  });
  return mutation;
}

export default useResetPassword;

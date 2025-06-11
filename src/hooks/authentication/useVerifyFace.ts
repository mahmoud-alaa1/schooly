import { verifyFace } from "@/services/authenticationServices";
import { useMutation } from "@tanstack/react-query";

function useVerifyFace() {
  const mutation = useMutation({
    mutationFn: (formData: FormData) => verifyFace(formData),
    onSuccess: (data) => {
      console.log("Face verification successful:", data);
    },
    onError: (error) => {
      console.log("Error during verify code:", error.message);
    },
  });
  return mutation;
}

export default useVerifyFace;

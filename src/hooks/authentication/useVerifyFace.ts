"use client";

import { verifyFace } from "@/services/authenticationServices";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

function useVerifyFace() {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: (formData: FormData) => verifyFace(formData),
    onSuccess: (data) => {
      console.log("Face verification successful:", data);
      setTimeout(() => {
        router.push("/lesson");
      }, 3000);
    },
    onError: (error) => {
      console.log("Error during verify code:", error.message);
    },
  });
  return mutation;
}

export default useVerifyFace;

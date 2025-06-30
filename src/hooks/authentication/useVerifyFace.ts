"use client";

import { verifyFace } from "@/services/authenticationServices";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function useVerifyFace() {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: (formData: FormData) => verifyFace(formData),
    onSuccess: (data) => {},
    onError: (error) => {
      toast.error(
        error.message || "حدث خطأ أثناء التحقق من الوجه. يرجى المحاولة مرة",
      );
    },
  });
  return mutation;
}

export default useVerifyFace;

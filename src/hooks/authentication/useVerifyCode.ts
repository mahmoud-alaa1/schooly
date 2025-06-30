import { verifyCodeService } from "@/services/authenticationServices";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function useVerifyCode() {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: verifyCodeService,
    onSuccess: (_, variables) => {
      router.replace(`/reset-password?email=${variables.email}`, {
        scroll: false,
      });
    },
    onError: (error) => {
      toast.error(error.message || "حدث خطأ ما, حاول مرة أخرى");
    },
  });
  return mutation;
}

export default useVerifyCode;

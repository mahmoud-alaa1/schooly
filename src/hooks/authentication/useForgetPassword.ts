import { forgetPasswordSchema } from "@/schemas/forgetPasswordSchema";
import { forgetPasswordService } from "@/services/authenticationServices";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function useForgetPassword() {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async (data: forgetPasswordSchema) => {
      return await forgetPasswordService(data);
    },
    onSuccess: (data, variables) => {
      toast.success("تم ارسال كود التحقق إلى بريدك الإلكتروني");
      router.replace(`/verify-code?email=${variables.email}`);
    },
    onError: (error) => {
      toast.error(error.message || "حدث خطأ ما, حاول مرة أخرى");
    },
  });
  return mutation;
}

export default useForgetPassword;

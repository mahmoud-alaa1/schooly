import { resetPasswordService } from "@/services/authenticationServices";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function useResetPassword() {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: resetPasswordService,
    onSuccess: (data) => {
      toast.success("تم إعادة تعيين كلمة المرور بنجاح");
      router.replace("/login?message=password-reset-successful", {
        scroll: false,
      });
    },
    onError: (error) => {
      toast.error(error.message || "حدث خطأ ما, حاول مرة أخرى");
    },
  });
  return mutation;
}

export default useResetPassword;

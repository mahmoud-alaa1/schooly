"use client";
import { useForm } from "react-hook-form";
import Spinner from "./Spinner";
import { Form } from "./ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { verifyCodeSchema, VerifyCodeSchema } from "@/schemas/verifyCodeSchema";
import useVerifyCode from "@/hooks/authentication/useVerifyCode";
import { useSearchParams } from "next/navigation";
import useForgetPassword from "@/hooks/authentication/useForgetPassword";
import FormOTPInput from "./forms/FormOTPInput";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

function VerifyCodeForm() {
  const { mutate, isPending } = useVerifyCode();
  const { mutate: forgetPasswordMutation } = useForgetPassword();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [isResending, setIsResending] = useState(false);

  const form = useForm<VerifyCodeSchema>({
    resolver: zodResolver(verifyCodeSchema),
  });

  function onSubmit(values: VerifyCodeSchema) {
    mutate(
      { ...values, email },
      {
        onSuccess: () => {
          toast.success("تم التحقق من الرمز بنجاح");
        },
      },
    );
  }

  const handleResendCode = () => {
    setIsResending(true);
    forgetPasswordMutation({ email });
    form.reset();
    setTimeout(() => setIsResending(false), 2000);
  };

  return (
    <motion.div
      className="px-4 py-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Form {...form}>
        <motion.form
          onSubmit={form.handleSubmit(onSubmit)}
          dir="ltr"
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <FormOTPInput<VerifyCodeSchema>
              control={form.control}
              name="code"
              label="أدخل رمز التحقق المكون من 6 أرقام"
              slotCount={6}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Button
              type="submit"
              className="w-full cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              disabled={isPending}
            >
              <AnimatePresence mode="wait">
                {isPending ? (
                  <motion.div
                    key="spinner"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.1 }}
                  >
                    <Spinner />
                  </motion.div>
                ) : (
                  <motion.span
                    key="text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.1 }}
                  >
                    تحقق من الرمز
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>

          <motion.div
            dir="rtl"
            className="flex items-center justify-between space-y-2 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <motion.p
              className="text-muted-foreground text-sm"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              لم تستلم الرمز؟
            </motion.p>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              <Button
                type="button"
                variant="link"
                className="p-0 text-sm transition-all duration-200 hover:scale-105 active:scale-95"
                onClick={handleResendCode}
                disabled={isResending}
              >
                <AnimatePresence mode="wait">
                  {isResending ? (
                    <motion.span
                      key="resending"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      جاري الإرسال...
                    </motion.span>
                  ) : (
                    <motion.span
                      key="resend"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      إعادة إرسال الرمز
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
          </motion.div>
        </motion.form>
      </Form>
    </motion.div>
  );
}

export default VerifyCodeForm;

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

function VerifyCodeForm() {
  const { mutate, isPending } = useVerifyCode();
  const { mutate: forgetPasswordMutation } = useForgetPassword();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const form = useForm<VerifyCodeSchema>({
    resolver: zodResolver(verifyCodeSchema),
  });

  function onSubmit(values: VerifyCodeSchema) {
    mutate({ ...values, email });
  }

  return (
    <div className="px-4 py-6">
      <div className="mb-6 text-center">
        <h2 className="mb-2 text-2xl font-bold">تحقق من رمز التأكيد</h2>
        <p className="text-muted-foreground">
          تم إرسال رمز التحقق إلى بريدك الإلكتروني
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          dir="ltr"
          className="space-y-6"
        >
          <FormOTPInput<VerifyCodeSchema>
            control={form.control}
            name="code"
            label="أدخل رمز التحقق المكون من 6 أرقام"
            slotCount={6}
          />

          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={isPending}
          >
            {isPending ? <Spinner /> : "تحقق من الرمز"}
          </Button>

          <div
            dir="rtl"
            className="flex items-center justify-between space-y-2 text-center"
          >
            <p className="text-muted-foreground text-sm">لم تستلم الرمز؟</p>
            <Button
              type="button"
              variant="link"
              className="p-0 text-sm"
              onClick={() => {
                forgetPasswordMutation({ email });
                form.reset();
              }}
            >
              إعادة إرسال الرمز
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default VerifyCodeForm;

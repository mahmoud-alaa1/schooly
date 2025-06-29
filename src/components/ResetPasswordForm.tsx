"use client";

import {
  resetPasswordSchema,
  ResetPasswordSchema,
} from "@/schemas/resetPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "./ui/form";
import FormPassword from "./forms/FormPassword";
import { Button } from "./ui/button";
import Spinner from "./Spinner";
import useResetPassword from "@/hooks/authentication/useResetPassword";
import { useSearchParams } from "next/navigation";

function ResetPasswordForm() {
  const { mutate, isPending } = useResetPassword();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
  });

  function onSubmit(values: ResetPasswordSchema) {
    mutate({ email, newPassword: values.password });
  }

  return (
    <div className="px-4 py-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormPassword<ResetPasswordSchema>
            control={form.control}
            name="password"
            label="كلمة المرور"
            placeholder="ادخل كلمة المرور"
            autoComplete="current-password"
          />
          <FormPassword<ResetPasswordSchema>
            control={form.control}
            name="confirmPassword"
            label="تأكيد كلمة المرور"
            placeholder="أعد إدخال كلمة المرور"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={isPending}
          >
            {isPending ? <Spinner /> : "أعد تعيين كلمة السر"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default ResetPasswordForm;

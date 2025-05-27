"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/forms/FormInput";
import FormPassword from "@/components/forms/FormPassword";
import { loginSchema } from "@/schemas/loginSchema";
import Link from "next/link";
import FormCheckbox from "./forms/FormCheckbox";
import useLogin from "@/hooks/authentication/useLogin";
import Spinner from "./Spinner";

const defaultValues: loginSchema = {
  email: "mahmoud@example.com",
  password: "mahmoud010",
  rememberMe: true,
};

export default function LoginForm() {
  const form = useForm<loginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues,
  });

  const { mutate, isPending } = useLogin();
  function onSubmit(values: loginSchema) {
    mutate(values);
  }

  return (
    <div className="p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormInput<loginSchema>
            control={form.control}
            name="email"
            label="البريد الالكتروني"
            placeholder="example@gmail.com"
            autoComplete="email"
          />
          <FormPassword<loginSchema>
            control={form.control}
            name="password"
            label="كلمة المرور"
            placeholder="ادخل كلمة المرور"
            autoComplete="current-password"
          />
          <div className=" flex justify-between text-[12px]">
            <FormCheckbox
              control={form.control}
              name="rememberMe"
              label="إحتفظ بالجلسة"
            />
            <Link
              href="/auth/forget-password"
              className="text-neutral-500 font-medium "
            >
              هل نسيت كلمة السر؟
            </Link>
          </div>
          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={isPending}
          >
            {isPending ? <Spinner /> : "تسجيل الدخول"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

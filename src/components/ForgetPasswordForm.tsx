"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgetPasswordSchema } from "@/schemas/forgetPasswordSchema";

import { Form } from "@/components/ui/form";
import { Button } from "./ui/button";
import FormInput from "./forms/FormInput";
import Spinner from "./Spinner";

import useForgetPassword from "@/hooks/authentication/useForgetPassword";

function ForgetPasswordForm() {
  const { mutate, isPending } = useForgetPassword();

  const form = useForm<forgetPasswordSchema>({
    resolver: zodResolver(forgetPasswordSchema),
  });

  function onSubmit(values: forgetPasswordSchema) {
    console.log("Submitted values:", values);
    mutate(values);
  }

  return (
    <div className="px-4 py-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormInput<forgetPasswordSchema>
            control={form.control}
            name="email"
            label="البريد الالكتروني"
            placeholder="example@gmail.com"
            autoComplete="email"
          />
          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={isPending}
          >
            {isPending ? <Spinner /> : "ارسال رمز التحقق"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default ForgetPasswordForm;

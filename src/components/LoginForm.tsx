"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";

// UI Components
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Icons
import { AiOutlineUser } from "react-icons/ai";
import { RiEyeOffLine } from "react-icons/ri";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { startTransition } from "react";
import { useRouter } from "next/navigation";

// Form Schema
import { loginSchema, TLoginFormValues } from "@/schemas/login";
import toast from "react-hot-toast";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const form = useForm<TLoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "maher@example.com",
      password: "maher012",
      rememberMe: true,
    },
  });

  const onSubmit = async (values: TLoginFormValues) => {
    const result = await signIn("credentials", {
      redirect: false,
      ...values,
    });

    if (result?.error) {
      toast.error("حدث خطأ أثناء تسجيل الدخول");
    } else {
      if (values.rememberMe)
        localStorage.setItem("rememberMe", new Date().toISOString());

      toast.success("تم تسجيل الدخول بنجاح");
      startTransition(() => {
        router.replace("/");
      });
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl border-2 border-neutral-200">
      <div className="flex items-center gap-x-2 p-4 border-b">
        <AiOutlineUser className="text-2xl" />
        <span>سجل دخولك</span>
      </div>

      <div className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">البريد الالكتروني</FormLabel>
                  <FormControl>
                    <Input
                      disabled={form.formState.isSubmitting}
                      {...field}
                      id="email"
                      type="email"
                      autoComplete="email"
                      className="py-5 placeholder:text-stone-400"
                      placeholder="example@gmail.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password">كلمة السر</FormLabel>
                  <FormControl>
                    <div className="focus-within:ring-2 focus-within:ring-black flex w-full items-center border rounded-lg">
                      <Input
                        {...field}
                        id="password"
                        disabled={form.formState.isSubmitting}
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        className="outline-none border-none rounded-[inherit] py-5"
                      />
                      <Button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="bg-transparent hover:text-stone-700 hover:bg-transparent text-stone-400 text-5xl p-3"
                      >
                        {showPassword ? (
                          <RiEyeOffLine />
                        ) : (
                          <MdOutlineRemoveRedEye />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-between items-baseline ">
              <FormField
                control={form.control}
                name="rememberMe"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Checkbox
                        disabled={form.formState.isSubmitting}
                        className=" data-[state=checked]:bg-[#02D496] data-[state=checked]:border-[#02D496]"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id="rememberMe"
                        name="rememberMe"
                      />
                    </FormControl>
                    <FormLabel htmlFor="rememberMe">
                      &nbsp;&nbsp; إحتفظ بالجلسة؟
                    </FormLabel>
                  </FormItem>
                )}
              />
              <Link
                className="text-stone-400 text-sm"
                href="/auth/forgot-password"
              >
                هل نسيت كلمة السر
              </Link>
            </div>

            <Button
              className="w-full bg-[#02D496] hover:bg-[#1a7258] py-6 text-lg rounded-lg"
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <span className="loader"></span>
              ) : (
                "تسجيل الدخول"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

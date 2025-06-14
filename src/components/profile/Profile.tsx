"use client";

import { Button } from "@/components/ui/button";
import { PencilLine, User2, Mail } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editProfileSchema } from "@/schemas/profileSchema";
import { Form } from "../ui/form";
import { Box, BoxBody, BoxHeader } from "../Box";
import FormInput from "../forms/FormInput";
import useGetProfile from "@/hooks/profile/useGetProfile";
import { useState, useEffect } from "react";

export default function Profile() {
  const [isEditMode, setIsEditMode] = useState(false);
  const { data, isPending, error } = useGetProfile();
  const form = useForm<editProfileSchema>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: "",
      email: "",
      profilePictureUrl: "",
    },
  });

  useEffect(() => {
    if (data?.data) {
      form.reset({
        name: data.data.name || "",
        email: data.data.email || "",
        profilePictureUrl: data.data.profilePictureUrl || "",
      });
    }
  }, [data, form]);

  function onSubmit(values: editProfileSchema) {
    console.log(values);
    setIsEditMode(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mb-6 overflow-hidden rounded-lg bg-neutral-50 shadow-md">
          <div className="from-primary h-32 bg-gradient-to-r to-emerald-600"></div>
          <div className="relative px-6 pb-3">
            <div className="relative -mt-16 mb-6">
              <div className="relative inline-block">
                <Image
                  src={data?.data?.profilePictureUrl || "/person1.png"}
                  alt="صورة الملف الشخصي"
                  width={128}
                  height={128}
                  className="rounded-full border-4 border-neutral-100 bg-orange-300 object-cover shadow-lg"
                  priority
                />
                {isEditMode && (
                  <Button
                    className="absolute end-1 bottom-1 size-8! rounded-full"
                    size="icon"
                  >
                    <PencilLine size={16} />
                  </Button>
                )}
              </div>
              <p className="mt-3">{data?.data?.name ?? "لا يوجد اسم"}</p>
            </div>
            <div className="mb-6 flex gap-3">
              <Button
                type={isEditMode ? "button" : "submit"}
                onClick={() => !isEditMode && setIsEditMode(true)}
              >
                {isEditMode ? "حفظ التغييرات" : "تعديل الملف الشخصي"}
                <PencilLine className="mr-2" />
              </Button>
              {isEditMode && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditMode(false)}
                  className="border-2 bg-neutral-200 hover:bg-neutral-300"
                >
                  إلغاء
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Box>
            <BoxHeader className="p-4!">
              <div className="flex items-center gap-2">
                <div className="bg-primary rounded-md p-1.5 text-white">
                  <User2 size={18} />
                </div>
                <h2 className="text-lg font-medium">المعلومات الأساسية</h2>
              </div>
            </BoxHeader>
            <BoxBody className="space-y-4 p-4!">
              <FormInput<editProfileSchema>
                control={form.control}
                name="name"
                placeholder="الاسم الكامل"
                label="الاسم الكامل"
                className="h-12"
                disabled={!isEditMode}
              />
              <FormInput<editProfileSchema>
                control={form.control}
                name="email"
                placeholder="البريد الإلكتروني"
                label="البريد الإلكتروني"
                className="h-12"
                disabled={!isEditMode}
                Icon={<Mail size={18} />}
              />
            </BoxBody>
          </Box>
          <Box>
            <BoxHeader>
              <h2 className="text-lg font-semibold">تعديل الملف الشخصي</h2>
            </BoxHeader>
            <BoxBody className="space-y-4 p-4!">not yet</BoxBody>
          </Box>
        </div>
      </form>
    </Form>
  );
}

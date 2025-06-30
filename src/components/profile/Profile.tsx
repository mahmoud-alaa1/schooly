"use client";

import { Button } from "@/components/ui/button";
import {
  PencilLine,
  User2,
  Mail,
  Phone,
  UserCog,
  Calendar,
} from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editProfileSchema } from "@/schemas/profileSchema";
import { Form } from "../ui/form";
import { Box, BoxBody, BoxHeader } from "../Box";
import FormInput from "../forms/FormInput";
import useGetProfile from "@/hooks/profile/useGetProfile";
import { useState, useEffect } from "react";
import ExtraInfoBox from "./ExtraInfoBox";
import InfoItem from "./InfoItem";
import FormImageDropzone from "../forms/FormImageDropzone";
import usePutProfile from "@/hooks/profile/usePutProfile";
import Spinner from "../Spinner";
import { Skeleton } from "@/components/ui/skeleton";
import { getImageUrl } from "@/lib/utils";

export default function Profile() {
  const [isEditMode, setIsEditMode] = useState(false);
  const { data, isPending } = useGetProfile();
  const { mutate, isPending: isUpdating } = usePutProfile();
  const form = useForm<editProfileSchema>({
    resolver: zodResolver(editProfileSchema),
  });
  useEffect(() => {
    if (data?.data) {
      form.reset({
        name: data.data.name,
        email: data.data.email,
      });
    }
  }, [data, form]);

  function onSubmit(values: editProfileSchema) {
    mutate(values);
    setIsEditMode(false);
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mb-6 overflow-hidden rounded-lg bg-neutral-50 shadow-md">
          <div className="from-primary h-32 bg-gradient-to-r to-emerald-600"></div>
          <div className="relative px-6 pb-3">
            <div className="relative -mt-16 mb-6">
              <div
                style={{
                  width: "128px",
                  height: "128px",
                  borderRadius: "50%",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                }}
                className="relative inline-block"
              >
                {isEditMode ? (
                  <FormImageDropzone<editProfileSchema>
                    control={form.control}
                    name="profilePictureUrl"
                  />
                ) : isPending ? (
                  <Skeleton className="h-32 w-32 rounded-full" />
                ) : (
                  <Image
                    src={getImageUrl(data?.data?.profilePictureUrl)}
                    alt="صورة الملف الشخصي"
                    fill
                    className="rounded-full border-4 border-neutral-100 bg-orange-300 object-cover shadow-lg"
                    priority
                  />
                )}
              </div>
              <div className="mt-3">
                {isPending ? (
                  <Skeleton className="h-6 w-40" />
                ) : (
                  (data?.data?.name ?? "لا يوجد اسم")
                )}
              </div>
            </div>
            <div className="mb-6 flex gap-3">
              <Button
                type={isEditMode ? "button" : "submit"}
                onClick={() => setIsEditMode(!isEditMode)}
              >
                {isUpdating ? (
                  <Spinner />
                ) : isEditMode ? (
                  "حفظ التغييرات"
                ) : (
                  "تعديل الملف الشخصي"
                )}
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
              {isEditMode ? (
                <FormInput<editProfileSchema>
                  control={form.control}
                  name="name"
                  placeholder="الاسم الكامل"
                  label="الاسم الكامل"
                  className="h-12"
                  disabled={!isEditMode}
                />
              ) : (
                <InfoItem
                  label="الاسم الكامل"
                  value={data?.data?.name ?? null}
                  isLoading={isPending}
                />
              )}
              {isEditMode ? (
                <FormInput<editProfileSchema>
                  control={form.control}
                  name="email"
                  placeholder="البريد الإلكتروني"
                  label="البريد الإلكتروني"
                  className="h-12"
                  disabled={!isEditMode}
                  Icon={<Mail size={18} />}
                  dir="ltr"
                />
              ) : (
                <InfoItem
                  label="البريد الإلكتروني"
                  value={data?.data?.email ?? null}
                  icon={Mail}
                />
              )}
              <InfoItem
                label="رقم الهاتف"
                value={data?.data?.phoneNumber ?? null}
                icon={Phone}
              />
              <InfoItem
                label="تاريخ الميلاد"
                value={data?.data?.dateOfBirth ?? null}
                icon={Calendar}
              />
              <InfoItem
                label="النوع"
                value={data?.data?.gender === 0 ? "ذكر" : "أنثى"}
                icon={User2}
              />
              <InfoItem
                label="الدور"
                value={
                  data?.data?.role === 0
                    ? "مدير"
                    : data?.data?.role === 1
                      ? "طالب"
                      : data?.data?.role === 2
                        ? "معلم"
                        : "مالك"
                }
                icon={UserCog}
              />
            </BoxBody>
          </Box>
          <ExtraInfoBox />
        </div>
      </form>
    </Form>
  );
}

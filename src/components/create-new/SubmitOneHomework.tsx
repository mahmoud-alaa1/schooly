"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import FormDropzone from "../forms/FormDropzone";
import { Button } from "../ui/button";
import { useDropzoneStore } from "@/store/dropzone";
import useSubmitHomework from "@/hooks/homeworks/useSubmitHomework";
import { z } from "zod";

interface SubmitOneHomeworkProps {
  homeWorkId: string;
  setOpen?: (open: boolean) => void;
}
export const submitOneHomeworkSchema = z.object({
  fileUrl: z.string({
    required_error: "الرجاءاضافة ملف",
  }),
});
export type submitOneHomeworkSchema = z.infer<typeof submitOneHomeworkSchema>;

export default function SubmitOneHomework({
  homeWorkId,
  setOpen,
}: SubmitOneHomeworkProps) {
  const { mutate } = useSubmitHomework();
  const { clearFiles } = useDropzoneStore();

  const form = useForm<submitOneHomeworkSchema>({
    resolver: zodResolver(submitOneHomeworkSchema),
  });

  function onSubmit(values: submitOneHomeworkSchema) {
    const data = { ...values, homeWorkId };
    mutate(data, {
      onSuccess: () => {
        clearFiles("fileUrl");
        form.reset();
        setOpen?.(false);
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <FormDropzone<submitOneHomeworkSchema>
          control={form.control}
          name="fileUrl"
        />
        <Button type="submit">{"ارسل"}</Button>
      </form>
    </Form>
  );
}

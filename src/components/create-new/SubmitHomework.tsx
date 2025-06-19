"use client";
import React from "react";
import FormInfiniteSelect from "../forms/FormInfiniteSelect";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitHomeworkSchema } from "@/schemas/homeworksSchema";
import { Form } from "../ui/form";
import { useParams } from "next/navigation";
import FormDropzone from "../forms/FormDropzone";
import { Button } from "../ui/button";
import { useDropzoneStore } from "@/store/dropzone";
import { getHomeworks } from "@/services/homeworksServices";
import useSubmitHomework from "@/hooks/homeworks/useSubmitHomework";

export default function SubmitHomework() {
  const { classroomId } = useParams();
  const { mutate } = useSubmitHomework();
  const { clearFiles } = useDropzoneStore();

  const form = useForm<submitHomeworkSchema>({
    resolver: zodResolver(submitHomeworkSchema),
  });

  function onSubmit(values: submitHomeworkSchema) {
    mutate(values, {
      onSuccess: () => {
        clearFiles("fileUrl");
        form.reset();
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <FormInfiniteSelect<submitHomeworkSchema, IHomework>
          control={form.control}
          name="homeWorkId"
          queryKey={["homeworks", classroomId as string]}
          getOptionLabel={(item) => item.lessonTitle + " | " + item.fileName}
          getOptionValue={(item) => item.homeWorkId}
          fetchFn={(pageNumber) =>
            getHomeworks({
              page: pageNumber,
              ClassRoomId: classroomId as string,
            })
          }
          placeholder="اختر درس للواجب"
          label="الدرس:"
        />
        <FormDropzone<submitHomeworkSchema>
          control={form.control}
          name="fileUrl"
        />
        <Button type="submit">{"ارسل"}</Button>
      </form>
    </Form>
  );
}

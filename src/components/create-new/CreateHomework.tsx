"use client";
import React from "react";
import FormInfiniteSelect from "../forms/FormInfiniteSelect";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createHomeworkSchema } from "@/schemas/homeworksSchema";
import { Form } from "../ui/form";
import { ILesson } from "@/types/lessons";
import { getLessons } from "@/services/lessonServices";
import { useParams } from "next/navigation";
import FormDatePicker from "../forms/FormDatePicker";
import FormDropzone from "../forms/FormDropzone";
import { Button } from "../ui/button";
import useCreateHomework from "@/hooks/homeworks/useCreateHomework";
import { useDropzoneStore } from "@/store/dropzone";

export default function CreateHomework() {
  const { classroomId } = useParams();
  const { mutate } = useCreateHomework();
  const { clearFiles } = useDropzoneStore();

  const form = useForm<createHomeworkSchema>({
    resolver: zodResolver(createHomeworkSchema),
  });

  function onSubmit(values: createHomeworkSchema) {
    const formattedDate = values.toDate.toISOString();
    mutate(
      {
        ...values,
        toDate: formattedDate,
      },
      {
        onSuccess: () => {
          form.reset();
          clearFiles("fileUrl");
        },
      },
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <div
          dir="rtl"
          className="grid w-full grid-cols-1 gap-4 sm:grid-cols-[60%_auto]"
        >
          <FormInfiniteSelect<createHomeworkSchema, ILesson>
            control={form.control}
            name="lessonId"
            queryKey={["lessons", classroomId as string]}
            getOptionLabel={(item) => item.title}
            getOptionValue={(item) => item.id}
            fetchFn={(pageNumber) =>
              getLessons({
                Page: pageNumber,
                classRoomId: classroomId as string,
              })
            }
            placeholder="اختر درس للواجب"
            label="الدرس:"
          />
          <FormDatePicker<createHomeworkSchema>
            control={form.control}
            name="toDate"
            placeholder="اختر تاريخ"
            label="نهاية موعد التسليم:"
          />
        </div>
        <FormDropzone<createHomeworkSchema>
          control={form.control}
          name="fileUrl"
        />
        <Button type="submit">{"انشئ"}</Button>
      </form>
    </Form>
  );
}

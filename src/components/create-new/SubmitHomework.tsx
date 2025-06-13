"use client";
import React from "react";
import FormInfiniteSelect from "../forms/FormInfiniteSelect";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitHomeworkSchema } from "@/schemas/homeworksSchema";
import { Form } from "../ui/form";
import { ILesson } from "@/types/lessons";
import { getLessons } from "@/services/lessonServices";
import { useParams } from "next/navigation";
import FormDropzone from "../forms/FormDropzone";
import { Button } from "../ui/button";
import useCreateHomework from "@/hooks/homeworks/useCreateHomework";
import { useDropzoneStore } from "@/store/dropzone";

export default function CreateHomework() {
  const { classroomId } = useParams();
  const { mutate } = useCreateHomework();
  const { clearFiles } = useDropzoneStore();

  const form = useForm<submitHomeworkSchema>({
    resolver: zodResolver(submitHomeworkSchema),
  });

  function onSubmit(values: submitHomeworkSchema) {
    
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <FormInfiniteSelect<submitHomeworkSchema, ILesson>
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
        <FormDropzone<submitHomeworkSchema>
          control={form.control}
          name="fileUrl"
        />
        <Button type="submit">{"ارسل"}</Button>
      </form>
    </Form>
  );
}

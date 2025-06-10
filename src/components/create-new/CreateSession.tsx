"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form } from "@/components/ui/form";
import { createLessonSchema } from "@/schemas/lessonsSchema";
import Spinner from "@/components/Spinner";
import { useParams } from "next/navigation";
import useCreateLesson from "@/hooks/lessons/useCreateLesson";
import FormInput from "../forms/FormInput";
import FormSelect from "../forms/FormSelectWithOptions";
import { Clock } from "lucide-react";
import FormDatePicker from "../forms/FormDatePicker";
import { Button } from "../ui/button";
import { ELessonType } from "@/types/enums";

export default function CreateSession() {
  const { isPending, mutate } = useCreateLesson();
  const { classroomId } = useParams();

  const form = useForm<createLessonSchema>({
    resolver: zodResolver(createLessonSchema),
    defaultValues: {
      to: "00:00:01",
      from: "00:00:00",
    },
  });

  function onSubmit(values: createLessonSchema) {
    const formattedDate =
      values.date instanceof Date
        ? values.date.toISOString().split("T")[0]
        : values.date;
    mutate(
      {
        classRoomId: classroomId as string,
        lessonType: Number(values.lessonType),
        title: values.title,
        date: formattedDate,
        from: values.from,
        to: values.to,
      },
      {
        onSuccess: () => {
          form.reset();
        },
      },
    );
  }

  console.log(form.watch("lessonType"));
  return (
    <Form {...form}>
      <form
        dir="rtl"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <FormSelect
            labelClassName="text-sm"
            control={form.control}
            name="lessonType"
            label="نوع الجلسة"
            options={[
              { label: "شرح", value: ELessonType.Explain },
              { label: "حل الواجب", value: ELessonType.HomeworkSolution },
              { label: "تدريب", value: ELessonType.Practice },
              { label: "مراجعة", value: ELessonType.Revision },
              { label: "أخرى", value: ELessonType.Other },
            ]}
            placeholder="اختر نوع الجلسة"
          />
          <FormInput
            labelClassName="text-sm"
            control={form.control}
            name="title"
            label="عنوان الجلسة"
            placeholder="عنوان الجلسة"
          />
        </div>
        <div className="grid gap-5 wrap-anywhere sm:grid-cols-3">
          <FormDatePicker
            placeholder="اختر التاريخ ..."
            label="التاريخ"
            control={form.control}
            name="date"
          />

          <FormInput
            step="1"
            type="time"
            labelClassName="text-sm"
            control={form.control}
            name="from"
            label="من"
            placeholder="وقت البدء"
            Icon={<Clock className="size-4" />}
            className="appearance-none pr-2 text-right [&::-webkit-calendar-picker-indicator]:hidden"
          />

          <FormInput
            step="1"
            type="time"
            labelClassName="text-sm"
            control={form.control}
            name="to"
            label="إلى"
            placeholder="وقت الانتهاء"
            Icon={<Clock className="size-4" />}
            className="appearance-none pr-2 text-right ltr:text-left rtl:text-right [&::-webkit-calendar-picker-indicator]:hidden"
          />
        </div>
        <Button type="submit">{isPending ? <Spinner /> : "انشئ"}</Button>
      </form>
    </Form>
  );
}

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
import { ELessonTypeString } from "@/types/enums";
import { format } from "date-fns";

export default function CreateSession() {
  const { isPending, mutate } = useCreateLesson();
  const { classroomId } = useParams();

  const form = useForm<createLessonSchema>({
    resolver: zodResolver(createLessonSchema),
    defaultValues: {
      to: "00:30:00",
      from: "00:00:00",
      date: new Date(),
    },
  });

  function onSubmit(values: createLessonSchema) {
    mutate(
      {
        classRoomId: classroomId as string,
        //@ts-ignore
        lessonType: Number(values.lessonType),
        title: values.title,
        date: format(values.date, "yyyy-MM-dd"),
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
              { label: "شرح", value: ELessonTypeString.Explain },
              { label: "حل الواجب", value: ELessonTypeString.HomeworkSolution },
              { label: "تدريب", value: ELessonTypeString.Practice },
              { label: "مراجعة", value: ELessonTypeString.Revision },
              { label: "أخرى", value: ELessonTypeString.Other },
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
            className="appearance-none pr-2 [&::-webkit-calendar-picker-indicator]:hidden"
            dir="rtl"
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
            className="appearance-none pr-2 ltr:text-left rtl:text-right [&::-webkit-calendar-picker-indicator]:hidden"
            dir="rtl"
          />
        </div>
        <Button type="submit">{isPending ? <Spinner /> : "انشئ"}</Button>
      </form>
    </Form>
  );
}

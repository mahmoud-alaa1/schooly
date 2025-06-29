"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form } from "@/components/ui/form";
import { createLessonSchemaWithClassroomId } from "@/schemas/lessonsSchema";
import Spinner from "@/components/Spinner";
import FormInput from "../forms/FormInput";
import FormSelect from "../forms/FormSelectWithOptions";
import { Clock } from "lucide-react";
import FormDatePicker from "../forms/FormDatePicker";
import { Button } from "../ui/button";
import { ELessonTypeString } from "@/types/enums";
import { ILesson } from "@/types/lessons";
import useUpdateLesson from "@/hooks/lessons/useUpdateLesson";
import useGetUserClassrooms from "@/hooks/classrooms/useGetUserClassrooms";

interface IUpdateSessionProps {
  setIsCreateDialogOpen: (open: boolean) => void;
  lesson: ILesson;
}

export default function UpdateSession({
  setIsCreateDialogOpen,
  lesson,
}: IUpdateSessionProps) {
  const { isPending, mutate } = useUpdateLesson();
  const { data } = useGetUserClassrooms();

  const form = useForm<createLessonSchemaWithClassroomId>({
    resolver: zodResolver(createLessonSchemaWithClassroomId),
    defaultValues: {
      classRoomId: lesson.classRoomId,
      lessonType: lesson.lessonType,
      title: lesson.title,
      date: new Date(lesson.date),
      from: lesson.from,
      to: lesson.to,
    },
  });

  function onSubmit(values: createLessonSchemaWithClassroomId) {
    const formattedDate =
      values.date instanceof Date
        ? values.date.toISOString().split("T")[0]
        : values.date;
    mutate(
      {
        id: lesson.id,
        classRoomId: values.classRoomId,
        //@ts-ignore
        lessonType: Number(values.lessonType),
        title: values.title,
        date: formattedDate,
        from: values.from,
        to: values.to,
      },
      {
        onSuccess: () => {
          form.reset();
          setIsCreateDialogOpen(false);
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
          {data && data?.data.length > 0 && (
            <FormSelect
              labelClassName="text-sm"
              control={form.control}
              name="classRoomId"
              label="الصف الدراسي"
              options={data?.data?.map((classroom) => ({
                label: `${classroom.grade} - ${classroom.subject}`,
                value: classroom.id,
              }))}
              placeholder="اختر الصف الدراسي"
            />
          )}

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
        <Button type="submit">{isPending ? <Spinner /> : "تحديث"}</Button>
        <Button
          variant="outline"
          type="button"
          onClick={() => setIsCreateDialogOpen(false)}
        >
          إلغاء
        </Button>
      </form>
    </Form>
  );
}

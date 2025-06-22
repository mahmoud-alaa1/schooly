import { ELessonType } from "@/types/enums";
import { nativeEnum, z } from "zod";

export const createLessonSchema = z.object({
  title: z.string({
    required_error: "عنوان الجلسة مطلوب",
  }),
  lessonType: nativeEnum(ELessonType, {
    required_error: "نوع الجلسة مطلوب",
    invalid_type_error: "نوع الجلسة غير صحيح",
  }),
  date: z.date({
    required_error: "تاريخ الجلسة مطلوب",
  }),
  from: z.string({
    required_error: "وقت البدء مطلوب",
  }),
  to: z.string({
    required_error: "وقت الانتهاء مطلوب",
  }),
});

export const createLessonSchemaWithClassroomId = createLessonSchema.extend({
  classRoomId: z.string({
    required_error: "معرف الفصل الدراسي مطلوب",
  }),
});

export type createLessonSchemaWithClassroomId = z.infer<
  typeof createLessonSchemaWithClassroomId
>;
export type createLessonSchema = z.infer<typeof createLessonSchema>;

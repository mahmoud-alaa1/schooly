import { isBefore, parse } from "date-fns";
import { z } from "zod";

export const createLessonSchema = z.object({
  title: z.string({
    required_error: "عنوان الجلسة مطلوب",
  }),
  lessonType: z.coerce.number({
    required_error: "نوع الجلسة مطلوب",
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

export type createLessonSchema = z.infer<typeof createLessonSchema>;

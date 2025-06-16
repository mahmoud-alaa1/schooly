import { z } from "zod";

export const createHomeworkSchema = z.object({
  lessonId: z.string({
    required_error: "الرجاء اختيار الدرس",
  }),
  fileUrl: z.string({
    required_error: "الرجاء اضافة ملف",
  }),
  deadline: z
    .date({
      required_error: "الرجاء اختيار تاريخ سماحية الطلب لرفع الواجب",
      invalid_type_error: "الرجاء اختيار تاريخ صحيح",
    })
    .refine((date) => date instanceof Date && !isNaN(date.getTime()), {
      message: "الرجاء اختيار تاريخ صحيح",
    }),
});
export const submitHomeworkSchema = z.object({
  homeWorkId: z.string({
    required_error: "الرجاء اختيار الواجب",
  }),
  fileUrl: z.string({
    required_error: "الرجاءاضافة ملف",
  }),
});

export type submitHomeworkSchema = z.infer<typeof submitHomeworkSchema>;
export type createHomeworkSchema = z.infer<typeof createHomeworkSchema>;

import { z } from "zod";

export const commentSchema = z.object({
  content: z.string().refine((val) => val.trim() !== "", {
    message: "لا يمكن ان يكون التعليق فارغ",
  }),
});

export type commentSchema = z.infer<typeof commentSchema>;

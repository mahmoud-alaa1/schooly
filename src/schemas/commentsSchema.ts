import { z } from "zod";

export const commentSchema = z.object({
  content: z.string(),
});

export type commentSchema = z.infer<typeof commentSchema>;

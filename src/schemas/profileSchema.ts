import { z } from "zod";
export const editProfileSchema = z.object({
  profilePictureUrl: z.string().optional().nullable(),
  name: z.string().optional(),
  email: z.string().email("البريد الإلكتروني غير صالح").optional(),
});

export type editProfileSchema = z.infer<typeof editProfileSchema>;

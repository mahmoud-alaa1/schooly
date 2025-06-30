import { z } from "zod";
export const editProfileSchema = z.object({
  profilePictureUrl: z.string().optional().nullable(),
  name: z.string(),
  email: z.string().email("البريد الإلكتروني غير صالح"),
});

export type editProfileSchema = z.infer<typeof editProfileSchema>;

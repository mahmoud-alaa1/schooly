// Form Schema

import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("من فضلك ادخل بريد الكتروني صحيح"),
  password: z
    .string()
    .min(6, "كلمة السر يجب ان تكون 6 حروف على الاقل")
    .max(50, "اقصى كلمة سر 50 حرف"),
  rememberMe: z.boolean(),
});

export type TLoginFormValues = z.infer<typeof loginSchema>;

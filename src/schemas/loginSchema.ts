import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({
    message: "ايميل غير صالح",
  }),
  password: z.string().min(6, {
    message: "كلمة المرور يجب ان تكون علي الاقل 6 حروف",
  }),
  rememberMe: z.boolean(),
});

export type loginSchema = z.infer<typeof loginSchema>;

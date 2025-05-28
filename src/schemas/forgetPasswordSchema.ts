import { z } from "zod";

export const forgetPasswordSchema = z.object({
  email: z.string().email({
    message: "البريد الالكتروني غير صالح",
  }),
});

export type forgetPasswordSchema = z.infer<typeof forgetPasswordSchema>;

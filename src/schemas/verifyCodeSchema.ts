import { z } from "zod";

export const verifyCodeSchema = z.object({
  code: z.string().min(6, {
    message: "رمز التحقق يجب أن يتكون من 6 أرقام",
  }),
});
export type VerifyCodeSchema = z.infer<typeof verifyCodeSchema>;

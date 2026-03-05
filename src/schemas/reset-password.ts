import { z } from "zod";
import { password } from '@/schemas/common';

export const resetPasswordSchema = z.object({
  password,
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords do not match.",
});

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
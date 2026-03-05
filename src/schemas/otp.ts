import { z } from 'zod';

export const otp = z.string({ required_error: "Code is required" })
  .min(6, "Code length must be 6 characters long")
  .max(6, "Code length must be 6 characters long")
  .regex(/^\d+$/, "Code must contain only digits");

export const otpSchema = z.object({
  otp: otp,
})

export const defaultOtpValues = {
  otp: '',
};

export type OtpSchema = z.infer<typeof otpSchema>;
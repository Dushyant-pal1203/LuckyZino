import { z } from "zod"
import { isPhoneNumber } from 'class-validator';

export const email = z.string({ required_error: "Email is required" })
  .min(1, "Email is required")
  .email("Invalid email");

export const password = z
  .string()
	.trim()
  .min(1, "Password is required")
  .min(8, "Password must be more than 8 characters")
  .max(32, "Password must be less than 32 characters")
	.regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[^a-zA-Z0-9 ]/, "Password must contain at least one special character");

export const passwordLogin = z.string()
  .min(1, "Password is required")
  .min(8, "Password must be more than 8 characters")


export const phoneNumber = z
  .string()
  .transform((val) => val.replace(/[^+0-9]/g, ''))
  .transform((val) => val.startsWith('+') ? val : '+' + val)
  .refine((val) => isPhoneNumber(val), {
    message: 'Invalid phone number format'
  })

export const phoneNumberSchema = z.object({
  phoneNumber,
})

export const defaultPhoneNumberValues = {
  phoneNumber: '',
};

export type PhoneNumberSchema = z.infer<typeof phoneNumberSchema>;

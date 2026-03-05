import { z } from 'zod';
import { email } from '@/schemas/common';

export const forgotPasswordSchema = z.object({
  email,
})

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
import { z } from 'zod';
import { email, passwordLogin } from '@/schemas/common';

export const signInSchema = z.object({
  email,
  password: passwordLogin,
})

export type SignInSchema = z.infer<typeof signInSchema>;

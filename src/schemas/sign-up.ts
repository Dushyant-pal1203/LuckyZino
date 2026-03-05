import { z } from 'zod';
import { email, password } from '@/schemas/common';
import { SUPPORTED_EMAIL_DOMAINS } from '@/constants/auth';

export const signUpSchema = z
	.object({
		firstName: z.string().trim().min(1, 'Name is required'),
		lastName: z.string().trim().min(1, 'Surname is required'),
		email,
		password,
		confirmPassword: z.string().trim(),
	})
	.superRefine(({ email, password, confirmPassword }, ctx) => {
		const userName = email.slice(0, email.indexOf("@"));
		const domain = email.slice(email.indexOf("@") + 1);

		if (SUPPORTED_EMAIL_DOMAINS.includes(domain) && (userName.includes('+'))) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Your email contains a \"+\" alias. Remove it to continue.",
				path: ["email"], // Optional: specify the field path
			});
		};

		if(confirmPassword !== password) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Passwords do not match",
				path: ["confirmPassword"], 
			});
		}
	});

export type SignUpSchema = z.infer<typeof signUpSchema>;
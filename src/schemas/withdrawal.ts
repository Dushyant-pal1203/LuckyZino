import { z } from 'zod';

export const createTransactionSchema = z.object({
  accountId: z.string().min(4, 'Account ID is required'),
  amount: z.number().min(1, 'Amount must be greater than 0')
});

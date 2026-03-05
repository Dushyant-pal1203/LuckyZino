import { NextRequest, NextResponse } from 'next/server';
import { withdrawalApiService } from '@/services/api-service';
import { auth } from 'auth';
import { ApiError } from '@/services/server-request';
import { createTransactionSchema } from '@/schemas/withdrawal';
import { WithdrawalRequestDto } from '@/types/withdrawal';
import { withLogging } from '@/lib/logging/withLogging';

export const POST = withLogging(async (req: NextRequest): Promise<NextResponse> => {
  const session = await auth();
  if (!session || !session.user || !session.accessToken) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const withdrawalRequest = await req.json();
    const data: WithdrawalRequestDto = await createTransactionSchema.parseAsync(withdrawalRequest);
    const transaction = await withdrawalApiService.createTransaction(data);

    return NextResponse.json(transaction);
  } catch (e: any) {
    if (['ZodError'].includes(e.name)) {
      return NextResponse.json(
        { error: e.errors || e.message },
        { status: 400 }
      );
    }
    if (e instanceof ApiError) {
      return NextResponse.json({ error: e.error, reason: e.reason }, { status: e.status });
    }
    return NextResponse.json(
      { error: 'An error occurred' },
      { status: 500 }
    );
  }
});

import { NextResponse } from 'next/server';
import { withdrawalApiService } from '@/services/api-service';
import { auth } from 'auth';
import { ApiError } from '@/services/server-request';
import { withLogging } from '@/lib/logging/withLogging';

export const POST = withLogging(async (): Promise<NextResponse> => {
  const session = await auth();
  if (!session || !session.user || !session.accessToken) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const accounts = await withdrawalApiService.getAccounts();

    return NextResponse.json(accounts);
  } catch (e: any) {
    if (e instanceof ApiError) {
      return NextResponse.json({ error: e.error, reason: e.reason }, { status: e.status });
    }
    return NextResponse.json(
      { error: 'An error occurred' },
      { status: 500 }
    );
  }
});

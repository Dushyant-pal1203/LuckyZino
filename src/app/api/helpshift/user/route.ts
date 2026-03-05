import { withLogging } from '@/lib/logging/withLogging';
import { NextResponse } from 'next/server';
import { auth } from 'auth';
import { toNextResponse } from '@/services/server-request';
import { helpshiftApiService } from '@/services/api-service';

export const GET = withLogging(async (): Promise<NextResponse> => {
  const session = await auth();
  if (!session || !session.user || !session.accessToken) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    return await toNextResponse(helpshiftApiService.getUserInfo());
  } catch {
    return NextResponse.json(
      { error: 'An error occurred' },
      { status: 500 }
    );
  }
});
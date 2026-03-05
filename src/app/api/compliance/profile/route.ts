import { NextResponse } from 'next/server';
import { kycApiService } from '@/services/api-service';
import { auth } from 'auth';
import { toNextResponse } from '@/services/server-request';
import { withLogging } from '@/lib/logging/withLogging';

export const GET = withLogging(async (): Promise<NextResponse> => {
  const session = await auth();
  if (!session || !session.user || !session.accessToken) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    return await toNextResponse(kycApiService.getUserProfile());
  } catch {
    return NextResponse.json(
      { error: 'An error occurred' },
      { status: 500 }
    );
  }
})

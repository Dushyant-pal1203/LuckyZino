import { NextRequest, NextResponse } from 'next/server';
import { withdrawalApiService } from '@/services/api-service';
import { auth } from 'auth';
import { ApiError } from '@/services/server-request';
import { withLogging } from '@/lib/logging/withLogging';

export const GET = withLogging(async (req: NextRequest): Promise<NextResponse> => {
  const session = await auth();
  if (!session || !session.user || !session.accessToken) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  const searchParams = req.nextUrl.searchParams;
  const limit = parseInt(searchParams.get('limit') || '10', 10);
  const offset = parseInt(searchParams.get('offset') || '0', 10);

  try {
    const history = await withdrawalApiService.getHistory({ limit, offset });

    return NextResponse.json(history);
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

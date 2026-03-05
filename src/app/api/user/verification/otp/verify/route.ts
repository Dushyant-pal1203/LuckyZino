import { NextRequest, NextResponse } from 'next/server';
import { auth } from 'auth';
import { toNextResponse } from '@/services/server-request';
import { userApiService } from '@/services/api-service';

export async function POST(req: NextRequest): Promise<NextResponse> {
  const session = await auth();
  if (!session || !session.user || !session.accessToken) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
  const { ...body } = await req.json();

  try {
    return await toNextResponse(userApiService.verifyAndSaveUserOtpToken(body));
  } catch {
    return NextResponse.json(
      { error: 'An error occurred' },
      { status: 500 }
    );
  }
}
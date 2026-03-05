import { NextResponse } from 'next/server';
import { auth } from 'auth';
import { toNextResponse } from '@/services/server-request';
import { userApiService } from '@/services/api-service';

export async function GET(): Promise<NextResponse> {
  const session = await auth();
  if (!session || !session.user || !session.accessToken) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    return await toNextResponse(userApiService.checkUserOtpVerificationExists());
  } catch {
    return NextResponse.json(
      { error: 'An error occurred' },
      { status: 500 }
    );
  }
}
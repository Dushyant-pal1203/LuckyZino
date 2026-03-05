import { NextRequest, NextResponse } from 'next/server';
import { auth } from 'auth';
import { toNextResponse } from '@/services/server-request';
import { userApiService } from '@/services/api-service';
import { OtpTriggerSource } from '@/types/enums/otp';

export async function GET(
  req: NextRequest,
  { params }: { params: any }
): Promise<NextResponse> {
  const session = await auth();
  if (!session || !session.user || !session.accessToken) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  const { source } = await params;

  try {
    return await toNextResponse(userApiService.checkUserOtpVerificationRequired(source as OtpTriggerSource));
  } catch {
    return NextResponse.json(
      { error: 'An error occurred' },
      { status: 500 }
    );
  }
}
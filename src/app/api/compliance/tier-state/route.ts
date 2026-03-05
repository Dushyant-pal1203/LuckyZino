import { NextRequest, NextResponse } from 'next/server';
import { kycApiService } from '@/services/api-service';
import { auth } from 'auth';
import { toNextResponse } from '@/services/server-request';
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
    const { tier } = await req.json();
    if (!['onboarding', 'deposit', 'withdrawal'].includes(tier)) {
      return NextResponse.json(
        { error: 'Invalid Compliance Tier' },
        { status: 400 }
      );
    }

    return await toNextResponse(kycApiService.getUserTierState({tier}));
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: 'An error occurred' },
      { status: 500 }
    );
  }
})

export const PUT = withLogging(async (req: NextRequest): Promise<NextResponse> => {
  const session = await auth();
  if (!session || !session.user || !session.accessToken) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const { tier, status } = await req.json();
    if (!['onboarding', 'deposit', 'withdrawal'].includes(tier)) {
      return NextResponse.json(
        { error: 'Invalid Compliance Tier' },
        { status: 400 }
      );
    }

    if (!['NOT_VERIFIED', 'IN_PROGRESS'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid Compliance Status' },
        { status: 400 }
      );
    }

    return await toNextResponse(kycApiService.updateUserTierState({tier, status}));
  } catch (e: any) {
    console.error(e);
    return NextResponse.json(
      { error: 'An error occurred' },
      { status: 500 }
    );
  }
})


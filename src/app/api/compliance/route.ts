import { NextRequest, NextResponse } from 'next/server';
import { kycApiService } from '@/services/api-service';
import {
  complianceSchemaDeposit,
  complianceSchemaOnboarding,
  complianceSchemaWithdrawal,
  socureDiSchema
} from '@/schemas/kyc';
import { KycUserTierState } from '@/types/kyc';
import { auth } from 'auth';
import { ApiError } from '@/services/server-request';
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
    const { tier, priceAmount, ...body } = await req.json();

    let data;
    let tierState: KycUserTierState;
    switch (tier) {
      case 'onboarding':
        data = await complianceSchemaOnboarding.merge(socureDiSchema).parseAsync(body);
        tierState = await kycApiService.kycOnboarding(data);
        break;
      case 'deposit':
        data = await complianceSchemaDeposit.merge(socureDiSchema).parseAsync(body);
        tierState = await kycApiService.kycDeposit({ ...data, priceAmount });
        break;
      case 'withdrawal':
        data = await complianceSchemaWithdrawal.merge(socureDiSchema).parseAsync(body);
        tierState = await kycApiService.kycWithdrawal({ ...data });
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid Compliance Tier' },
          { status: 400 }
        );
    }

    return NextResponse.json(tierState);
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

import { NextRequest, NextResponse } from 'next/server';
import { auth } from 'auth';
import { withLogging } from '@/lib/logging/withLogging';
import { toNextResponse } from '@/services/server-request';
import { paymentsApiService } from '@/services/api-service';
import { ApplePayValidateMerchantRequest } from '@/types/applepay';

export const POST = withLogging(async (req: NextRequest): Promise<NextResponse> => {
  const session = await auth();
  if (!session?.user || !session.accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = (await req.json()) as ApplePayValidateMerchantRequest;

    if (!body?.validationURL || typeof body.validationURL !== 'string') {
      return NextResponse.json({ error: 'validationURL is required' }, { status: 400 });
    }

    return await toNextResponse(paymentsApiService.applePayValidateMerchant(body));
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
});

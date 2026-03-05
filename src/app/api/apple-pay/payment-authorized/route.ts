import { NextRequest, NextResponse } from 'next/server';
import { auth } from 'auth';
import { withLogging } from '@/lib/logging/withLogging';
import { toNextResponse } from '@/services/server-request';
import { paymentsApiService } from '@/services/api-service';
import { ApplePayAuthorizedRequest } from '@/types/applepay';

function isValidApplePayPayload(body: any): boolean {
  const pd = body?.paymentData;
  return !!(
    body?.invoiceId &&
    typeof body.invoiceId === 'string' &&
    pd &&
    typeof pd.version === 'string' &&
    typeof pd.data === 'string' &&
    typeof pd.signature === 'string' &&
    pd.header &&
    typeof pd.header.ephemeralPublicKey === 'string' &&
    typeof pd.header.publicKeyHash === 'string' &&
    typeof pd.header.transactionId === 'string'
  );
}

export const POST = withLogging(async (req: NextRequest): Promise<NextResponse> => {
  const session = await auth();
  if (!session?.user || !session.accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = (await req.json()) as ApplePayAuthorizedRequest;

    if (!isValidApplePayPayload(body)) {
      return NextResponse.json({ error: 'Invalid request payload' }, { status: 400 });
    }

    return await toNextResponse(paymentsApiService.applePayPaymentAuthorized(body));
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
});

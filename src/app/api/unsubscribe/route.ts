import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token');

  if (!token) {
    console.warn('[UNSUBSCRIBE GET] Missing token');
    return NextResponse.json(
      { error: 'Missing token' },
      { status: 400 }
    );
  }

  console.log('[UNSUBSCRIBE GET] token:', token);

  return new Response('You have been unsubscribed.', {
    status: 200,
    headers: { 'Content-Type': 'text/plain' }
  });
}

export async function POST(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token');

  if (!token) {
    console.warn('[UNSUBSCRIBE POST] Missing token');
    return new Response(null, { status: 400 });
  }

  console.log('[UNSUBSCRIBE POST] token:', token);

  return new Response(null, { status: 204 });
}

import { NextResponse } from 'next/server';
import { withLogging } from '@/lib/logging/withLogging';

export const GET = withLogging(async (): Promise<NextResponse> => {
  try {
    const response = await fetch('https://api.flinks.com/events', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.FLINKS_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Flinks API error' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: `Internal Server Error ${error}` }, { status: 500 });
  }
});

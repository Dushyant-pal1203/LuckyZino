/**
 * Created by Viktor Plotnikov <viktorr.plotnikov@gmail.com>
 * Date: 18/06/2025 15:37
 */
import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { auth } from 'auth';
import { withUser } from '@/lib/logging/logger';

export async function GET(
  req: NextRequest,
  { params }: { params: any }
) {
  const session = await auth();
  const userId = session?.user?.id || "anonymous";
  const log = withUser(userId);
  const url = new URL(req.url);

  try {
    const { filename } = await params;
    const filePath = path.join(process.cwd(), 'public', 'well_known_files', filename)
    const content = await fs.readFile(filePath, 'utf8')

    log.info(`Static file served: ${filename}`, {
      method: req.method,
      path: url.pathname,
      query: Object.fromEntries(url.searchParams.entries()),
      userId,
      status: 200,
    });

    return new NextResponse(content, {
      headers: {
        'Content-Type': 'text/plain',
      },
    })
  } catch (err: any) {
    log.error(`Static file not found or failed to serve`, {
      method: req.method,
      path: url.pathname,
      query: Object.fromEntries(url.searchParams.entries()),
      userId,
      status: 404,
      error: err?.message,
      stack: err?.stack,
    });
    return new NextResponse('Not found', { status: 404 })
  }
}

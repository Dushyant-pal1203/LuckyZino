/**
 * Created by Viktor Plotnikov <viktorr.plotnikov@gmail.com>
 * Date: 26/02/2025 12:49
 */
import BlockedClient from '@/app/(app)/blocked/blocked-client';

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page({ searchParams }: PageProps) {
  const resolved = await searchParams;
  const error = typeof resolved.error === 'string' ? resolved.error : '';
  const reason = typeof resolved.reason === 'string' ? resolved.reason : error;
  return <BlockedClient reason={reason} />
}

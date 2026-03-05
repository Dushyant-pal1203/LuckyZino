'use client';

import FullScreenLoader from '@/components/ui/fullscreen-loader';
import { useSearchParams, usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DeepLinkClient() {
  const path = usePathname();
  const params = useSearchParams();
  const router = useRouter();
  useEffect(() => {
    const token = path.replace('/dl/', '');
    const buildId = params.get('buildId');
    if (token) {
      localStorage.setItem('deepLinkToken', token);
    }
    router.push(buildId ? `/game?buildId=${buildId}` : '/game');
  }, [path, router, params]);
  return (
    <FullScreenLoader />
  );
}

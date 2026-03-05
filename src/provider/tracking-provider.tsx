'use client';

import Cookies from 'js-cookie';
import { USER_ANALYTICS_CONTEXT } from '@/constants/auth';
import { getAnalyticsContext } from '@/lib/trackers';
import { isProdEnv } from '@/lib/utils';
import React, { useEffect, useState } from 'react';
import FullScreenLoader from '@/components/ui/fullscreen-loader';

export default function TrackingProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const runRequests = async () => {
    const context = await getAnalyticsContext();
    Cookies.set(USER_ANALYTICS_CONTEXT, JSON.stringify(context), {
      path: '/',
      secure: isProdEnv(),
      sameSite: 'lax',
      expires: 1
    });
    setIsLoading(false);
  };
  useEffect(() => {
    runRequests();
  }, []);
  if(isLoading) return <FullScreenLoader />;
  return <>{children}</>;
}

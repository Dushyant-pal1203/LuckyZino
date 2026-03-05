"use client"

import FullScreenLoader from '@/components/ui/fullscreen-loader';
import withAuth from '@/hocs/with-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/game');
  }, [router]);

  return <FullScreenLoader />
}

export default withAuth(Home);

import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { ComponentType, useEffect } from 'react';
import Spinner from '@/components/ui/spinner';
import { Session } from 'next-auth';

export interface SessionContextProp {
  data: Session;
  status: 'authenticated' | 'unauthenticated' | 'loading';
}

const withAuth = <P extends object>(
  Component: ComponentType<P & { sessionContext: SessionContextProp }>
): ComponentType<P> => {
  return function AuthenticatedComponent(props: P) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === 'unauthenticated') {
        const currentPath = `${window.location.pathname}${window.location.search}`;
        const callbackUrl = encodeURIComponent(currentPath);
        router.push(`/sign-in?callbackUrl=${callbackUrl}`);
				localStorage.removeItem('userId');
        return;
      }
      if (status === 'authenticated' && !session) {
        signOut();
				localStorage.removeItem('userId');
        router.push('/sign-in');
      }
    }, [session, status, router]);

    if (status === 'loading') {
      return (
        <div className="w-full h-full min-h-[100vh] flex flex-col justify-center">
          <Spinner size={100} />
        </div>
      );
    }

    if (status === 'authenticated' && session?.user?.id) {
      localStorage.setItem('userId', session?.user?.id);
      sessionStorage.setItem('user-session-token', session.accessToken ?? '');
      return (
        <Component {...props} sessionContext={{ data: session, status }} />
      );
    }

    return null;
  };
};

export default withAuth;

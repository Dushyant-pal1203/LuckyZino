import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { ComponentType, useEffect } from 'react';
import Spinner from '@/components/ui/spinner';

const withoutAuth = <P extends object>(Component: ComponentType<P>) => {
  return function UnauthenticatedComponent(props: P) {
    const { status } = useSession();
    const router = useRouter();
    const { ignoreRedirect } = props as any;
    // Redirect if already authenticated
    useEffect(() => {
      if (status === 'authenticated' && !ignoreRedirect) {
        router.push('/game');
      }
    }, [status, router, ignoreRedirect]);

    if (status === 'authenticated' && !ignoreRedirect) {
      return null;
    }

    if (status === 'loading') {
      return (
        <div className="h-full w-full min-h-[100vh] flex flex-col justify-center">
          <Spinner size={100} />
        </div>
      );
    }

    return <Component {...props} />;
  };
};

export default withoutAuth;

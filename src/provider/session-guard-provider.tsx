import { ReactNode, useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { ErrorCode } from '@/lib/errors';

const SessionGuardProvider = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();

  useEffect(() => {
    const checkErrors = async () => {
      if (session?.error) {
        let redirectTo;
        if (session?.reason !== ErrorCode.FAILED_TO_REFRESH_TOKEN) {
          redirectTo = `/blocked?error=${encodeURIComponent(session.error)}`;
          if (session?.reason) {
            redirectTo += `&reason=${encodeURIComponent(session.reason)}`;
          }
        }

        await signOut({ redirectTo });
      }
    };

    checkErrors();
  }, [session]);

  return children;
};

export default SessionGuardProvider;

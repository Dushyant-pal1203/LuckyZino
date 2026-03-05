/**
 * Created by Viktor Plotnikov <viktorr.plotnikov@gmail.com>
 * Date: 26/02/2025 12:49
 */
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { FailureReasonUserMessage } from '@/lib/errors';
import { FormContainer } from '@/components/ui/auth/form-container';
import { AuthButton } from '@/components/ui/auth/auth-button';
import { sendBIEvent } from '@/lib/trackers';
import { useEffect } from 'react';
import { TrackerEvents } from '@/enum/trackers';
import { useRouter } from 'next/navigation';
import { UIEvents } from '@/enum/ui';

interface BlockedClientProps {
  reason: string;
}

const BlockedClient = ({ reason }: BlockedClientProps) => {
  const router = useRouter();
  useEffect(() => {
    sendBIEvent(TrackerEvents.UserBlocked, { reason });
  }, []);
  const errorMessage = FailureReasonUserMessage[reason];
  const isLocaionError = Boolean(errorMessage);
  return (
    <div className="w-full max-w-md mt-10 ">
      <AnimatePresence>
        <motion.div
          key="blocked-page"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="relative w-[350px] mx-auto"
        >
          <FormContainer>
            <div className="flex flex-col items-center jusify-center gap-0 relative">
              <img
                src={
                  isLocaionError
                    ? '/images/icons/location.png'
                    : '/images/icons/user.png'
                }
              />
              <img src="/images/icons/ix_error.png" />
            </div>
            <h1
              className="text-xl text-center font-bold mb-2 font-['Exo_2'] relative mt-2"
              style={{
                textShadow: `0px -0.559px 12.754px rgba(244, 153, 24, 0.73), 0px 0.559px 6.992px #F49918`,
                lineHeight: '88%',
                letterSpacing: '1.12px'
              }}
            >
              Access Blocked
            </h1>
            <p
              className="text-white font-extrabold text-md text-center text-md font-['Exo_2'] relative p-2 mt-6 mb-2"
              style={{
                textShadow: `0px -0.559px 12.754px rgba(244, 153, 24, 0.73), 0px 0.559px 6.992px #F49918`,
                lineHeight: '88%',
                letterSpacing: '1.12px'
              }}
            >
              {errorMessage || reason}
            </p>
          </FormContainer>
        </motion.div>
      </AnimatePresence>
      <div className="w-full relative flex flex-col items-center px-6 md:px-14 mt-10 gap-4">
        <AuthButton
          disabled={false}
          name="support"
          featureName="blocked_page"
          onClick={() => {
            (window as any).HelpshiftWidget('show');
            (window as any).HelpshiftWidget('open');
          }}
        >
          CONTACT SUPPORT
        </AuthButton>

        <AuthButton
          disabled={false}
          name="return_main"
          featureName="blocked_page"
          variant="secondary"
          onClick={() => {
            window.postMessage({ name: UIEvents.CloseModal }, '*');
            router.replace('/');
          }}
        >
          RETURN TO MAIN
        </AuthButton>
      </div>
    </div>
  );
};

export default BlockedClient;

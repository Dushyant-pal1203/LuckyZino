import HelpshiftStyles from '@/components/ui/helpshift-styles';
import OtpHeader from '@/components/otp/header/otp-header';
import OtpGreetingsVisual from '@/components/otp/visual/otp-greetings-visual';
import OtpVerification from '@/components/otp/verification/otp-verification';
import { useCallback, useEffect, useState } from 'react';
import { useMessageHandler } from '@/hooks/useMessageHandler';
import { CheckUserOtpVerificationExistsResponse, CloseOtpData, OtpInitData } from '@/types/otp';
import { request } from '@/services/request-handler';
import Spinner from '@/components/ui/spinner';

/**
 * OtpContent component
 *
 * This component represents the main container for the OTP verification flow.
 * It handles the step-based navigation, success closing behavior, and layout.
 *
 * Steps:
 *  - Step 1: User enters phone number
 *  - Step 2: User enters OTP code
 *  - Step 3: Verification success (modal auto-closes after a short delay)
 */
export default function OtpContent() {
  const [step, setStep] = useState(1);
  const [userToken, setUserToken] = useState<string | undefined>('');
  const [initData, setInitData] = useState<OtpInitData | null>(null);
  const [verifiedPhone, setVerifiedPhone] = useState<string | null>(null);
  const [initialized, setInitialized] = useState<boolean>(false);

  /**
   * Notify the parent window to close the OTP modal.
   * This uses postMessage for cross-frame communication.
   */
  const onClose = useCallback(async (passed: boolean) => {
    const closeOtpData = { 
      passed, 
      source: initData?.source,
      userToken: userToken
    } as CloseOtpData;
    window.parent.postMessage({ name: 'otp.close', data: closeOtpData}, '*');
  }, [initData?.source, userToken]);

  useMessageHandler(message => {
    const { name, data } = message;
    if (name === 'otp.init') {
      setInitData((data as OtpInitData));
    }
  });

  /**
   * Automatically close the modal 1.5 seconds after reaching step 3
   * (successful verification).
   */
  useEffect(() => {
    if(step == 3) {
      setTimeout(() => onClose(true), 1500);
    }
  }, [onClose, step]);

  /**
   * Handle back navigation:
   * - If on step 1 → close the modal
   * - Otherwise → go one step back
   */
  const handleStepBack = () => {
    if (step === 1) {
      onClose(false);
    } else {
      setStep(step - 1);
    }
  };

  useEffect(() => {
    const checkUserVerification = async () => {
      try {
        const verificationExists = await request<CheckUserOtpVerificationExistsResponse>(
          'api/user/verification/otp/check-verification'
        );

        const { phone, isVerified } = verificationExists;

        if(isVerified && phone) {
          setVerifiedPhone(phone);
          setStep(2);
        }
      }finally {
        setInitialized(true);
      }
    }

    checkUserVerification();
  }, [])

  return (
    <div className="w-full h-full font-lzMain text-white">
      <div className="w-full h-full shadow-lg flex flex-col overflow-hidden">
        <OtpHeader
          showBackButton={step !== 3}
          onStepBack={handleStepBack}
        />
        <div className="p-8 h-fit">
          {!initialized ? <Spinner /> : (
            <>
              <OtpGreetingsVisual />
              <OtpVerification
                step={step}
                verifiedPhone={verifiedPhone}
                setStep={setStep}
                setUserToken={setUserToken}
              />
            </>
          )}
        </div>
      </div>
      <HelpshiftStyles /> {/* remove helpshift badge */}
    </div>
  );
}

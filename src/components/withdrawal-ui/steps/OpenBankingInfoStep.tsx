'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { WithdrawalStatusButton } from '../withdrawalStatusButton';
import Spinner from '@/components/ui/spinner';
import { request } from '@/services/request-handler';
import {
  WithdrawalOpenBankingResponse,
  WithdrawalStepProps
} from '@/types/withdrawal';
import {
  Connect,
  ConnectDoneEvent,
  ConnectErrorEvent,
  ConnectEventHandlers,
  ConnectOptions
} from 'connect-web-sdk';
import { WithdrawalStep } from '@/enum/withdrawalUi';
import { SessionContextProp } from '@/hocs/with-auth';
import { GuardHook } from './InitialStep';

const OpenBankingInfoStep = ({
  data: { account },
  setStep,
	sessionContext
}: WithdrawalStepProps) => {
	const kycStatus = sessionStorage.getItem('kycStatus');
	const session = sessionContext ?? ({} as SessionContextProp);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrolledToBottom, setScrolledToBottom] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
	const [renderKYC, setRenderKYC] = useState(kycStatus !== 'withdrawal');

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
      });
    }
  }, [error]);

  useEffect(() => {
    const scrollElement = scrollRef.current;

    if (!scrollElement) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollElement;
      const isBottom = scrollTop + clientHeight >= scrollHeight - 2;
      setScrolledToBottom(isBottom);
    };
    handleScroll();
    scrollElement.addEventListener('scroll', handleScroll);
    return () => scrollElement.removeEventListener('scroll', handleScroll);
  }, [isLoading, renderKYC]);

  const fetchOpenBanking = async () => {
    try {
      setIsLoading(true);
      return await request<WithdrawalOpenBankingResponse>(
        'api/withdrawal/open-banking'
      );
    } catch (err) {
      console.error('Error fetching open banking:', err);
      setError('Failed to load banking information');
      setIsLoading(false);
    }
  };

  const launchOpenBanking = (url: string) => {
    const connectEventHandlers: ConnectEventHandlers = {
      onDone: (event: ConnectDoneEvent) => {
        if (event.code === 200) {
          const hasAccounts = account?.accounts && account.accounts.length > 0;
          if (hasAccounts) {
            setStep(WithdrawalStep.SelectAccount);
          } else {
            window.parent.postMessage(
              { name: 'withdrawal.close_form_modal' },
              '*'
            );
          }
        } else {
          setError('Open Banking process was not completed successfully.');
        }
      },
      onCancel: () => {
        setError('Open Banking process was cancelled.');
        setIsLoading(false);
      },
      onError: (event: ConnectErrorEvent) => {
        console.error(`Open Banking error: ${event.reason}`);
        setError(`Open Banking error: ${event.reason}`);
        setIsLoading(false);
      },
      // onUser: (event: any) => { console.log('onUser', event); },
      onLoad: () => {
        setIsLoading(false);
      }
    };

    const connectOptions: ConnectOptions = {
      overlay: 'rgba(199,201,199, 0.5)'
    };

    Connect.launch(url, connectEventHandlers, connectOptions);
  };

  const handleContinue = async () => {
    if (scrolledToBottom) {
      const response = await fetchOpenBanking();
      if (response) {
        launchOpenBanking(response.url);
      }
    }
  };

  const containerStyles =
    "font-['Exo_2'] w-full h-full flex flex-col items-center justify-between gap-3 pt-[18px] pb-[24px] sm:pt-[18px] sm:pb-[36px]";
  const textContainerStyles = 'relative w-full h-full overflow-hidden';
  const scrollContainerStyles =
    'withdrawal-custom-scrollbar w-full h-full overflow-y-scroll flex flex-col items-center justify-start px-[18px] pb-[24px] sm:pl-[44px] sm:pr-[44px] sm:pb-[36px]';
  const titleStyles =
    'text-center text-white text-[24px] font-semibold leading-[95%] tracking-[0.96px] mb-3';
  const textStyles =
    'text-white/80 text-[14px] sm:text-[16px] font-semibold leading-[111%] tracking-[0.56px]';
  const subTitleStyles =
    'text-white text-[14px] sm:text-[16px] font-bold leading-[111%] tracking-[0.56px]';
  const listContainerStyles = 'mt-4 list-disc list-outside ml-4';
  const listStyles = 'mb-4';
  const scrollIndicatorStyles =
    'absolute bottom-0 left-0 w-full h-[36px] flex items-center justify-center [background-blend-mode:multiply,normal] bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,#190c39_100%)]';
  const indicatorTextStyles =
    "text-white text-center uppercase font-['Exo_2'] text-[20px] font-bold leading-[88%] tracking-[0.8px] [text-shadow:0px_-0.559px_12.754px_rgba(244,153,24,0.73),0px_0.559px_6.992px_#F49918]";

	if(renderKYC) {
		return <GuardHook session={session} callback={() => setRenderKYC(false)}></GuardHook>
	}

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <Spinner size={100} />
      </div>
    );
  }

  return (
    <div className={containerStyles}>
      <div className={textContainerStyles}>
        <div ref={scrollRef} className={scrollContainerStyles}>
          <h2 className={titleStyles}>
            What’s Going to <br /> Happen Next?
          </h2>
          <div className={textStyles}>
            <p>
              In the next tab, you’ll be taken through the final steps needed to
              complete your Redemption Request. This is a quick and secure
              process designed to ensure your cash prize reaches you safely and
              exactly how you want.
            </p>
            <p>Here’s a detailed breakdown of what you can expect:</p>
            <ul className={listContainerStyles}>
              <li className={listStyles}>
                <span className={subTitleStyles}>Review Your Information.</span>{' '}
                You’ll be asked to double-check the personal and payment details
                you’ve previously entered. This is your chance to make any final
                changes or corrections before proceeding.
              </li>
              <li className={listStyles}>
                <span className={subTitleStyles}>
                  Choose Your Preferred Prize Payment Method.
                </span>{' '}
                Depending on availability, you’ll be able to select how you’d
                like to receive your cash prize — whether it’s via bank
                transfer, digital wallet, or another supported option. Each
                method may have its own processing time and requirements.
              </li>
              <li className={listStyles}>
                <span className={subTitleStyles}>
                  Confirm and Finalize the Redemption Request.
                </span>{' '}
                After reviewing and selecting your prize payment method, you’ll
                confirm the transaction. Once confirmed, we’ll process your
                request and send you a confirmation notice with all the relevant
                details.
              </li>
              <li className={listStyles}>
                <span className={subTitleStyles}>
                  Return to This Tab if Needed.
                </span>{' '}
                In case you need to make changes or track your Redemption
                Request status, you’ll be able to return to this tab at any
                time.
              </li>
              <p>
                Please{' '}
                <span className={subTitleStyles}>keep this tab open</span> while
                completing the process to ensure everything runs smoothly. If
                you close it too early, your progress may be lost or
                interrupted.
              </p>
            </ul>
          </div>
        </div>
        <div className={scrollIndicatorStyles}>
          <h4
            className={`${indicatorTextStyles} transition-opacity duration-300 ${
              scrolledToBottom ? 'opacity-0' : 'opacity-100'
            } absolute`}
          >
            Scroll Down
          </h4>
          <div
            className={`relative flex items-center gap-2 transition-opacity duration-300 ${
              scrolledToBottom ? 'opacity-0' : 'opacity-100'
            } absolute`}
          >
            <Image
              src="/withdrawal_imgs/downIcon.png"
              alt="Scroll Down"
              width={32}
              height={32}
            />
            <h4 className={indicatorTextStyles}>Scroll Down</h4>
            <Image
              src="/withdrawal_imgs/downIcon.png"
              alt="Scroll Down"
              width={32}
              height={32}
            />
          </div>
          <h4
            className={`${indicatorTextStyles} transition-opacity duration-300 ${
              scrolledToBottom ? 'opacity-100' : 'opacity-0'
            } absolute`}
          >
            DONE
          </h4>
        </div>
      </div>
      <WithdrawalStatusButton
        state={scrolledToBottom ? 'active' : 'inactive'}
        btnText="Continue"
        onClick={handleContinue}
      />
    </div>
  );
};

export default OpenBankingInfoStep;

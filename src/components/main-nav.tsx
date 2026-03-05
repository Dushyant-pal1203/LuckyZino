'use client';

import Image from 'next/image';

import CustomLink from './custom-link';
import React, { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { steps } from '@/components/withdrawal-ui/withdrawalCard';
import { StorageKey, WithdrawalStep } from '@/enum/withdrawalUi';
import { sendBIEvent } from '@/lib/trackers';

const pathList = {
  '/sign-in': 'Login',
  '/sign-up': 'Join',
  '/compliance/deposit': 'First Time Purchase',
  '/compliance/withdrawal': 'First Time Redemption',
  '/withdrawal': 'Prize Redemption',
  '/forgot-password': 'Forgot Password',
  '/reset-password': 'Reset Password',
  '/compliance': 'Verify your Identity',
  '/privacy-policy': 'Privacy Policy',
  '/terms-and-conditions': 'Terms and Conditions',
  '/sweepstakes-rules': 'Sweepstakes Rules',
  '/excluded-territories': 'Excluded Territories',
  '/cookie-policy': 'Cookie Policy',
  '/responsible-social-gameplay-policy': 'Responsible Gameplay'
} as Record<string, string>;

export function MainNav() {
  const params = useSearchParams();
  const [backUrl, setBackUrl] = useState<string | null>(null);
  const path = usePathname();

  const page = pathList[path];
  const isInnerFlow = ['/compliance/deposit', '/compliance/withdrawal', '/withdrawal'].includes(path);
  const isBackBlocked = path !== '/blocked' && (!backUrl || path === '/sign-in' || isInnerFlow);
  const isWithdrawal = path === '/withdrawal';
  const [currentStep, setCurrentStep] = useState<string>(
    WithdrawalStep.Initial
  );

  useEffect(() => {
    setBackUrl(params.get('backUrl') ?? null);
  }, [params]);
  /** Initialize currentStep from sessionStorage on client */
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stepHistory = JSON.parse(
          sessionStorage.getItem(StorageKey.WithdrawalStepHistory) || '[]'
        ) as string[];
        const initialStep =
          stepHistory.length > 0 && steps[stepHistory[stepHistory.length - 1]]
            ? stepHistory[stepHistory.length - 1]
            : WithdrawalStep.Initial;
        setCurrentStep(initialStep);
      } catch (error) {
        console.error('MainNav: Initial sessionStorage error:', error);
      }
    }
  }, []);

  /** Poll sessionStorage for changes (same tab) */
  useEffect(() => {
    let lastStep = currentStep;
    const interval = setInterval(() => {
      if (typeof window !== 'undefined') {
        try {
          const stepHistory = JSON.parse(
            sessionStorage.getItem(StorageKey.WithdrawalStepHistory) || '[]'
          ) as string[];
          const newStep =
            stepHistory.length > 0 && steps[stepHistory[stepHistory.length - 1]]
              ? stepHistory[stepHistory.length - 1]
              : WithdrawalStep.Initial;
          if (newStep !== lastStep) {
            lastStep = newStep;
            setCurrentStep(newStep);
          }
        } catch (error) {
          console.error('MainNav: Polling error:', error);
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const isWithdrawalBackBlocked =
    isWithdrawal && currentStep === WithdrawalStep.Initial;

  const handleWithdrawalBack = () => {
    if (isWithdrawal && !isWithdrawalBackBlocked) {
      if (typeof window !== 'undefined') {
        try {
          const stepHistory = JSON.parse(
            sessionStorage.getItem(StorageKey.WithdrawalStepHistory) || '[]'
          ) as string[];
          const prevStep =
            stepHistory.length > 1 && steps[stepHistory[stepHistory.length - 2]]
              ? stepHistory[stepHistory.length - 2]
              : WithdrawalStep.Initial;
          stepHistory.pop();
          sessionStorage.setItem(
            StorageKey.WithdrawalStepHistory,
            JSON.stringify(stepHistory.slice(-10))
          );
          setCurrentStep(prevStep);
          sendBIEvent('site-button-clicked', {
            button: {
              id: 'back',
              featureName: 'withdrawal'
            }
          });
        } catch (error) {
          console.error('MainNav: Back error:', error);
        }
      }
    }
  };

  return (
    <div className="flex items-center gap-2 w-full relative max-w-[1050px]"
      style={{ userSelect: 'none' }}
  onMouseDownCapture={(e) => e.preventDefault()}
  onDoubleClickCapture={(e) => e.preventDefault()}
    >
      {isWithdrawal && (
        <button
          className={`absolute left-4 cursor-pointer ${
            isWithdrawalBackBlocked ? 'hidden' : ''
          }`}
          onClick={handleWithdrawalBack}
        >
          <img alt="back" src="/icons/back-icon.png" />
        </button>
      )}

      <CustomLink href={backUrl ?? "/"} className={`w-full flex justify-center relative items-center gap-0 no-underline ${isInnerFlow || isBackBlocked ? 'pointer-events-none' : 'pointer-events-auto'}`}>
        <img alt="back" className={`${isBackBlocked ? 'hidden' : ''} absolute left-4`} src='/icons/back-icon.png'></img>

       {path === '/blocked' ? (

      <div className="flex justify-center w-full relative items-center">
        <span
          className="text-white font-bold text-center uppercase text-[24px] font-['Exo_2']"

        >
          USER VERIFICATION
        </span>
      </div>
    ):
    <>
    <span
          className="text-white font-extrabold text-center uppercase text-md font-['Exo_2'] select-none"
          style={{
            textShadow: `0px -0.559px 12.754px rgba(244, 153, 24, 0.73), 0px 0.559px 6.992px #F49918`,
            lineHeight: '88%',
            letterSpacing: '1.12px'
          }}
        >
          {page}
        </span>
        <Image
          src="/images/main-logo.png"
          alt="Home"
          width="48"
          height="64"
          className="min-w-8 select-none pointer-events-none"
        />
        <Image
          src="/images/logo-txt.png"
          alt="Home"
          width="92"
          height="64"
          className="min-w-8 pt-1 -ml-1 block select-none pointer-events-none"
        />
        </>
        }

      </CustomLink>

      {/* {session?.user && (
        <>
          <button
            onClick={handleGameNavigation}
            className="md:ml-10 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Go to Game
          </button>
        </>
      )} */}
    </div>
  );
}

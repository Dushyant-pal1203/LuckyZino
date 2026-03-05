'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import PrivacyPolicy from '@/app/(app)/privacy-policy/page';
import TermsAndConditions from '@/app/(app)/terms-and-conditions/page';
import SweepstakesRules from '@/app/(app)/sweepstakes-rules/page';
import CookiePolicy from '@/app/(app)/cookie-policy/page';
import ResponsibleGameplayPolicy from '@/app/(app)/responsible-social-gameplay-policy/page';
import styles from './Footer.module.scss';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [modalPage, setModalPage] = useState<
    null | 'terms' | 'privacy' | 'rules' | 'responsible' | 'cookie'
  >(null);
  const router = useRouter();

  const closeModal = () => setModalPage(null);

  const renderModalContent = () => {
    switch (modalPage) {
      case 'terms':
        return <TermsAndConditions />;
      case 'privacy':
        return <PrivacyPolicy />;
      case 'rules':
        return <SweepstakesRules />;
      case 'responsible':
        return <ResponsibleGameplayPolicy />;
      case 'cookie':
        return <CookiePolicy />;
      default:
        return null;
    }
  };

  return (
    <>
      <footer
        className={`${styles.footerBackground} text-white py-[8px] font-['Exo_2']`}
      >
        <div className="md:flex md:justify-between mx-auto py-[16px] px-[24px] max-w-[1120px] gap-[24px]">
          {/* Desktop Layout */}
          {/* Left Side - Logo */}
          <div className="hidden md:flex md:flex-col md:justify-center flex-shrink-0">
            <div className="flex justify-center items-center mb-4">
              <img
                className="max-w-[240px]"
                src="/images/logo-gray.png"
                alt="logo"
              />
            </div>
            <p className="text-[14px] opacity-90">
              &copy; {currentYear} Silver Rhino LTD. All rights reserved.
            </p>
          </div>
          <div className="hidden md:flex md:flex-col">
            <div className="hidden md:flex md:justify-between md:items-start">
              {/* Middle - Navigation Links */}
              <div className="flex space-x-16">
                <div className="relative flex flex-col space-y-3 z-10">
                  <div className="flex space-x-3 mt-2">
                    <Link
                      href="https://www.facebook.com/profile.php?id=61574664105322"
                      target="_blank"
                      className="hover:opacity-80 transition-opacity"
                    >
                      <div className="w-[32px] h-[32px] flex items-center justify-center">
                        <img src="/images/fb.png" alt="fb logo" />
                      </div>
                    </Link>
                    <Link
                      href="https://www.instagram.com/lucky_zino_official/"
                      className="hover:opacity-80 transition-opacity"
                      target="_blank"
                    >
                      <div className="w-[32px] h-[32px] flex items-center justify-center">
                        <img src="/images/inst.png" alt="instagram logo" />
                      </div>
                    </Link>
                  </div>
                </div>

                <div className="relative flex flex-col space-y-3 z-10">
                  <div
                    onClick={() => setModalPage('terms')}
                    className="hover:text-purple-200 transition-colors cursor-pointer"
                  >
                    Terms and Conditions &nbsp;
                  </div>
                  <div
                    onClick={() => setModalPage('rules')}
                    className="hover:text-purple-200 transition-colors cursor-pointer"
                  >
                    Sweepstakes Rules
                  </div>
                  <div
                    onClick={() => setModalPage('privacy')}
                    className="hover:text-purple-200 transition-colors cursor-pointer"
                  >
                    Privacy Policy &nbsp;
                  </div>
                </div>
              </div>

              {/* Right Side - Additional Links */}
              <div className="relative flex flex-col space-y-3 z-10">
                <div
                  onClick={() => setModalPage('responsible')}
                  className="hover:text-purple-200 transition-colors cursor-pointer"
                >
                  Responsible Social Gameplay &nbsp;
                </div>
                <div
                  onClick={() => setModalPage('cookie')}
                  className="hover:text-purple-200 transition-colors cursor-pointer"
                >
                  Cookie Policy &nbsp;
                </div>
              </div>
            </div>
            <div className="md:flex md:justify-end pt-6 text-[14px] opacity-90">
              <div>
                <p>
                  Luckyzino is operated by Silver Rhino LTD, reg. number HE
                  470054, address - 2 Poreias, Limassol, 3011, Cyprus.
                </p>
                <p className="mb-2">
                  For assistance, contact us at support@luckyzino.com.
                </p>
                <p>
                  <strong>NO PURCHASE NECESSARY.</strong> Void where prohibited
                  by law. 18+.
                  <br />
                  For detailed information, see our Terms and Conditions and
                  Sweepstakes Rules.
                </p>
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden">
            {/* Navigation Links */}
            <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-6 text-[16px]">
              <div
                onClick={() => setModalPage('terms')}
                className="hover:text-purple-200 transition-colors cursor-pointer"
              >
                Terms and Conditions &nbsp;
              </div>
              <div
                onClick={() => setModalPage('rules')}
                className="hover:text-purple-200 transition-colors cursor-pointer"
              >
                Sweepstakes Rules
              </div>
              <div className="flex space-x-3">
                <Link
                  href="https://www.facebook.com/profile.php?id=61574664105322"
                  target="_blank"
                  className="hover:opacity-80 transition-opacity"
                >
                  <div className="w-8 h-8 min-w-[36px] min-h-[36px] flex items-center justify-center">
                    <img src="/images/fb.png" alt="fb logo" />
                  </div>
                </Link>
                <Link
                  href="https://www.instagram.com/lucky_zino_official/"
                  className="hover:opacity-80 transition-opacity"
                  target="_blank"
                >
                  <div className="w-8 h-8 min-w-[36px] min-h-[36px] flex items-center justify-center">
                    <img src="/images/inst.png" alt="instagram logo" />
                  </div>
                </Link>
              </div>
              <div
                onClick={() => setModalPage('privacy')}
                className="hover:text-purple-200 transition-colors cursor-pointer"
              >
                Privacy Policy
              </div>
            </div>

            <div className="space-y-3 mb-6 text-[16px]">
              <div
                onClick={() => setModalPage('responsible')}
                className="block hover:text-purple-200 transition-colors cursor-pointer"
              >
                Responsible Social Gameplay
              </div>
              <div
                onClick={() => setModalPage('cookie')}
                className="block hover:text-purple-200 transition-colors cursor-pointer"
              >
                Cookie Policy
              </div>
            </div>

            {/* Logo */}
            <div className="text-center mb-6">
              <div className="flex items-center justify-center mb-3">
                <img
                  className="max-w-[240px]"
                  src="/images/logo-gray.png"
                  alt="logo"
                />
              </div>
              <p className="text-[14px] opacity-90 mb-4">
                &copy; {currentYear} Silver Rhino LTD. All rights reserved.
              </p>
            </div>
            <div className="pt-6 text-[14px] opacity-90">
              <div>
                <p>
                  Luckyzino is operated by Silver Rhino LTD, reg. number HE
                  470054, address - 2 Poreias, Limassol, 3011, Cyprus.
                </p>
                <p className="mb-2">
                  For assistance, contact us at support@luckyzino.com.
                </p>
                <p>
                  <strong>NO PURCHASE NECESSARY.</strong> Void where prohibited
                  by law. 18+.
                  <br />
                  For detailed information, see our Terms and Conditions and
                  Sweepstakes Rules.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Text - Common for both layouts */}
          <div className="hidden justify-end pt-6 text-sm opacity-90">
            <div>
              <p>
                Luckyzino is operated by Silver Rhino LTD, reg. number HE
                470054, address - 2 Poreias, Limassol, 3011 Cyprus.
              </p>
              <p className="mb-2">
                For assistance, contact us at support@luckyzino.com.
              </p>
              <p>
                <strong>NO PURCHASE NECESSARY.</strong> Void where prohibited by
                law. 18+.
                <br />
                For detailed information, see our Terms and Conditions and
                Sweepstakes Rules.
              </p>
            </div>
          </div>
        </div>

        {modalPage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-r from-[#6929d8] to-[#f56476]">
            <button
              onClick={closeModal}
              className="absolute top-2 right-6 text-white hover:text-black text-7xl"
            >
              &times;
            </button>
            {renderModalContent()}
          </div>
        )}
      </footer>

      {/* Updated Footer Stick to match the image */}
      <div className={styles.footer_stick}>
        <div className={styles.footer_stick_content}>
          <img
            src="/images/lp_v15/desktop/bottom_text.png"
            alt="DAILY RELOAD DAILY REWARDS! JOIN NOW!"
            className={styles.footer_stick_text_desktop}
          />
          <img
            src="/images/lp_v15/mobile/bottom_text.png"
            alt="DAILY RELOAD DAILY REWARDS! JOIN NOW!"
            className={styles.footer_stick_text_mobile}
          />
          <img
            src="/images/lp_v15/desktop/join_button.png"
            alt="JOIN NOW"
            className={styles.footer_stick_button}
            onClick={() => router.replace('/sign-up')}
          />
        </div>
      </div>
    </>
  );
};

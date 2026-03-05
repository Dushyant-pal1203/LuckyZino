'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import WrappedLink from './ui/wrapped-link';
import { sendBIEvent } from '@/lib/trackers';
import { TrackerEvents } from '@/enum/trackers';

const restrictedFooterPathnames = [
  '/game',
  '/compliance/deposit',
  '/compliance/withdrawal',
  '/withdrawal',
  '/blocked',
  '/lp/v1',
  '/lp/v2',
  '/lp/v3',
  '/lp/v4',
  '/lp/v5',
  '/lp/v6',
  '/lp/v7',
  '/lp/v8',
  '/lp/v9',
  '/lp/v10',
  '/lp/v11',
  '/lp/v12',
  '/lp/v13',
  '/lp/v14',
  '/vip-chat',
  '/otp'
];

const Footer = () => {
  const pathname = usePathname();
  const isRestricted = restrictedFooterPathnames.some(path => pathname.includes(path));
  if (isRestricted) return null;
  return (
    <footer className="bg-[#18004a] text-white py-2 font-['Exo_2'] w-full mt-auto">
      <div className="md:flex md:justify-between mx-auto py-4 px-6 max-w-[70rem]">
        {/* Desktop Layout */}
        {/* Left Side - Logo */}
        <div className="hidden md:flex md:flex-col md:justify-center flex-shrink-0">
          <div className="flex justify-center items-center mb-4">
            <img className="max-w-[15rem]" src="/images/logo-gray.png" />
          </div>
          <p className="text-sm opacity-90">
            © 2025 Silver Rhino LTD. All rights reserved.
          </p>
        </div>
        <div className="hidden md:flex md:flex-col">
          <div className="hidden md:flex md:justify-between md:items-start">
            {/* Middle - Navigation Links */}
            <div className="flex space-x-16">
              <div className="flex flex-col space-y-3">
                <div
                  onClick={() => {
                    (window as any).HelpshiftWidget('show');
                    (window as any).HelpshiftWidget('open');
                    sendBIEvent(TrackerEvents.SiteButtonClicked, {
                      button: { id: 'helpshift', featureName: 'footer' }
                    });
                  }}
                  className="hover:text-purple-200 transition-colors cursor-pointer"
                >
                  Contact Us
                </div>
                <div className="flex space-x-3 mt-2">
                  <WrappedLink
                    name="facebook"
                    href="https://www.facebook.com/profile.php?id=61574664105322"
                    target="_blank"
                    className="hover:opacity-80 transition-opacity"
                  >
                    <div className="w-8 h-8 flex items-center justify-center">
                      <img src="/images/fb.png" />
                    </div>
                  </WrappedLink>
                  <WrappedLink
                    name="instagram"
                    href="https://www.instagram.com/lucky_zino_official/"
                    className="hover:opacity-80 transition-opacity"
                    target="_blank"
                  >
                    <div className="w-8 h-8 flex items-center justify-center">
                      <img src="/images/inst.png" />
                    </div>
                  </WrappedLink>
                </div>
              </div>

              <div className="flex flex-col space-y-3">
                <WrappedLink
                  name="terms-and-conditions"
                  href="/terms-and-conditions"
                  className="hover:text-purple-200 transition-colors"
                >
                  Terms and Conditions
                </WrappedLink>
                <WrappedLink
                  name="sweepstakes-rules"
                  href="/sweepstakes-rules"
                  className="hover:text-purple-200 transition-colors"
                >
                  Sweepstakes Rules
                </WrappedLink>
                <WrappedLink
                  name="privacy-policy"
                  href="/privacy-policy"
                  className="hover:text-purple-200 transition-colors"
                >
                  Privacy Policy
                </WrappedLink>
              </div>
            </div>

            {/* Right Side - Additional Links */}
            <div className="flex flex-col space-y-3">
              <WrappedLink
                name="responsible-social-gameplay-policy"
                href="/responsible-social-gameplay-policy"
                className="hover:text-purple-200 transition-colors"
              >
                Responsible Social Gameplay
              </WrappedLink>
              <WrappedLink
                name="cookie-policy"
                href="/cookie-policy"
                className="hover:text-purple-200 transition-colors"
              >
                Cookie Policy
              </WrappedLink>
            </div>
          </div>
          <div className="md:flex md:justify-end pt-6 text-sm opacity-90">
            <div>
              <p>
                Luckyzino is operated by Silver Rhino LTD, reg. number HE 470054,
                address - 2 Poreias, Limassol, 3011, Cyprus.
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

        {/* Mobile Layout */}
        <div className="md:hidden">
          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-6">
            <WrappedLink
              name="terms-and-conditions"
              href="/terms-and-conditions"
              className="hover:text-purple-200 transition-colors"
            >
              Terms and Conditions
            </WrappedLink>
            <div
              onClick={() => {
                (window as any).HelpshiftWidget('show');
                (window as any).HelpshiftWidget('open');
								sendBIEvent(TrackerEvents.SiteButtonClicked, {
									button: { id: 'helpshift', featureName: 'footer' }
								});
              }}
              className="hover:text-purple-200 transition-colors cursor-pointer"
            >
              Contact Us
            </div>
            <WrappedLink
              name="sweepstakes-rules"
              href="/sweepstakes-rules"
              className="hover:text-purple-200 transition-colors"
            >
              Sweepstakes Rules
            </WrappedLink>
            <div className="flex space-x-3">
              <WrappedLink
                name="facebook"
                href="https://www.facebook.com/profile.php?id=61574664105322"
                target="_blank"
                className="hover:opacity-80 transition-opacity"
              >
                <div className="w-8 h-8 flex items-center justify-center">
                  <img src="/images/fb.png" />
                </div>
              </WrappedLink>
              <WrappedLink
                name="instagram"
                featureName="footer"
                href="https://www.instagram.com/lucky_zino_official/"
                className="hover:opacity-80 transition-opacity"
                target="_blank"
              >
                <div className="w-8 h-8 flex items-center justify-center">
                  <img src="/images/inst.png" />
                </div>
              </WrappedLink>
            </div>
            <WrappedLink
              name="privacy-policy"
              href="/privacy-policy"
              className="hover:text-purple-200 transition-colors"
            >
              Privacy Policy
            </WrappedLink>
          </div>

          <div className="space-y-3 mb-6">
            <WrappedLink
              name="responsible-social-gameplay-policy"
              href="/responsible-social-gameplay-policy"
              className="block hover:text-purple-200 transition-colors"
            >
              Responsible Social Gameplay
            </WrappedLink>
            <WrappedLink
              name="cookie-policy"
              href="/cookie-policy"
              className="block hover:text-purple-200 transition-colors"
            >
              Cookie Policy
            </WrappedLink>
          </div>

          {/* Logo */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center mb-3">
             <div className="flex justify-center items-center mb-1">
            <img className="max-w-[15rem]" src="/images/logo-gray.png" />
          </div>
            </div>
            <p className="text-sm opacity-90 mb-4">
              © 2025 Silver Rhino LTD. All rights reserved.
            </p>
          </div>
          <div className="pt-6 text-sm opacity-90">
            <div>
              <p>
                Luckyzino is operated by Silver Rhino LTD, reg. number HE 470054,
                address - 2 Poreias, Limassol, 3011, Cyprus.
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

        {/* Bottom Text - Common for both layouts */}
        <div className="hidden flex justify-end pt-6 text-sm opacity-90">
          <div>
            <p>
              Luckyzino is operated by Silver Rhino LTD, reg. number HE 470054,
              address - 2 Poreias, Limassol, 3011 Cyprus.
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
    </footer>
  );
};

export default Footer;

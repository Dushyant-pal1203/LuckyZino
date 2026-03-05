'use client';

import OtpContent from '@/components/otp/otp-content';

/**
 * OtpPage component
 *
 * Entry point for the OTP verification page.
 * Simply renders the `OtpContent` component, which contains
 * the full OTP verification flow.
 *
 * This page is intended to be loaded inside an iframe from the main app.
 */
export default function OtpPage() {
  return <OtpContent />;
}
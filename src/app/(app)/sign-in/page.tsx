import type { Metadata } from 'next';
import SignInClient from './sign-in-client';

export const metadata: Metadata = {
  title: 'LuckyZino Social Casino · Login',
  description:
    'Already a member? Log in to your LuckyZino account to enjoy thrilling social casino games, exclusive offers, secure gameplay, and a wide variety of slot games.',
  openGraph: {
    title: 'LuckyZino Social Casino · Login',
    description:
      'Already a member? Log in to your LuckyZino account to enjoy thrilling social casino games, exclusive offers, secure gameplay, and a wide variety of slot games.',
    url: 'https://luckyzino.com',
    siteName: 'LuckyZino',
    locale: 'en_US',
    type: 'website',
		images: [{url: 'https://luckyzino.com/images/social-preview.jpg', width: 1200, height: 630, alt: 'social-preview'}],
  }
};

export default function SignIn() {
  return <SignInClient />;
}

import { redirect } from 'next/navigation';
import { isRegistrationEnabled } from '@/lib/utils';
import type { Metadata } from 'next';
import SignUpWrapper from './sign-up-wrapper';

export const metadata: Metadata = {
  title: 'LuckyZino · Sign up | Create an Account',
  description:
    'Create your free LuckyZino account now and dive into a world of excitement. Enjoy a variety of games, daily bonuses, and a real chance to win.',
  openGraph: {
    title: 'LuckyZino · Sign up | Create an Account',
    description:
      'Create your free LuckyZino account now and dive into a world of excitement. Enjoy a variety of games, daily bonuses, and a real chance to win.',
    url: 'https://luckyzino.com/sign-up',
    siteName: 'LuckyZino',
    locale: 'en_US',
    type: 'website',
		images: [{url: 'https://luckyzino.com/images/social-preview.jpg', width: 1200, height: 630, alt: 'social-preview'}],
  }
};

export default async function SignUp() {
  if (!isRegistrationEnabled()) {
    redirect('/');
  }

  return <SignUpWrapper />;
}

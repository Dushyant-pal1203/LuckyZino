import GameClient from '@/app/(app)/game/[[...feature]]/game-client';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Play Exciting Slots Online | LuckyZino Social Casino Games',
  description:
    'LuckyZino is your ultimate destination for social casino excitement. Enjoy spinning top-quality games, claim daily bonuses, unlock exclusive rewards, and enjoy VIP perks – all on one exciting platform designed for play and enjoyment!',
  openGraph: {
    title: 'Play Exciting Slots Online | LuckyZino Social Casino Games',
    description:
      'LuckyZino is your ultimate destination for social casino excitement. Enjoy spinning top-quality games, claim daily bonuses, unlock exclusive rewards, and enjoy VIP perks – all on one exciting platform designed for play and enjoyment!',
    url: 'https://luckyzino.com',
    siteName: 'LuckyZino',
    locale: 'en_US',
    type: 'website',
    images: [{ url: 'https://luckyzino.com/images/social-preview.jpg', width: 1200, height: 630, alt: 'social-preview' }],
  }
};

export default function Page() {
  return <GameClient />;
}

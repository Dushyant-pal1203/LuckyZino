/* eslint-disable @next/next/no-img-element */
import dynamic from 'next/dynamic';
import Script from 'next/script';
import Header from '@/components/lp/v7/Header';
import { VideoSection } from '@/components/lp/v7/VideoSection';
import { ExclusiveSection } from '@/components/lp/v7/ExclusiveSection';

const BonusSlider = dynamic(() => import('@/components/lp/v7/BonusSlider').then(mod => mod.BonusSlider), { ssr: true });
const AmazingGamesSlider = dynamic(() => import('@/components/lp/v7/AmazingGamesSlider').then(mod => mod.AmazingGamesSlider), { ssr: true });
const ProvidersSlider = dynamic(() => import('@/components/lp/v7/ProvidersSlider').then(mod => mod.ProvidersSlider), { ssr: true });
const BenefitSection = dynamic(() => import('@/components/lp/v7/BenefitSection').then(mod => mod.BenefitSection), { ssr: true });
const TestimonialsSlider = dynamic(() => import('@/components/lp/v7/TestimonialsSlider').then(mod => mod.TestimonialsSlider), { ssr: true });
const Footer = dynamic(() => import('@/components/lp/v7/Footer').then(mod => mod.Footer), { ssr: true });
const ActionSection = dynamic(() => import('@/components/lp/v7/ActionSection').then(mod => mod.ActionSection), { ssr: true });

import HelpshiftStyles from '@/components/ui/helpshift-styles';
import styles from '@/styles/pages/pageV7.module.scss';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'LuckyZino | Best Social Casino – Play Free Slot Games Online',
  description:
    "Play the best online social casino slot games at LuckyZino. Enjoy hundreds of exciting free-to-play slots, claim daily rewards, and try your luck at winning big prizes!",
  openGraph: {
    title: 'LuckyZino | Best Social Casino – Play Free Slot Games Online',
    description:
      "Play the best online social casino slot games at LuckyZino. Enjoy hundreds of exciting free-to-play slots, claim daily rewards, and try your luck at winning big prizes!",
    url: 'https://luckyzino.com',
    siteName: 'LuckyZino',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://luckyzino.com/images/social-preview.jpg',
        width: 1200,
        height: 630,
        alt: 'social-preview'
      }
    ]
  }
};

export default function Home() {
  return (
    <>
      <Script
        id="facebook-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '694246586383525');
              fbq('track', 'PageView');
            `
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src="https://www.facebook.com/tr?id=694246586383525&ev=PageView&noscript=1"
          alt="fb-pixel"
        />
      </noscript>
      <div id="landingPageV9" className={styles.landingPageV7}>
        <Header />
        <VideoSection />
        <ExclusiveSection />
        <BonusSlider customClassName="testimonialsSliderV9" />
        <AmazingGamesSlider />
        <ProvidersSlider />
        <BenefitSection />
        <TestimonialsSlider customClassName="testimonialsSliderV9" />
        <Footer />
        <ActionSection />
        <HelpshiftStyles />
      </div>
      <Link className='hidden' href={'/sign-up'} prefetch />
    </>
  );
}

/* eslint-disable @next/next/no-img-element */
import Script from 'next/script';
import Header from '@/components/lp/v5/Header';
import { Footer } from '@/components/lp/v5/Footer';
import { MainSectionV8 } from '@/components/lp/v8/MainSectionV8';
import { DividerSection } from '@/components//lp/v5/DividerSection';
import { ClaimSectionV8 } from '@/components//lp/v8/ClaimSectionV8';
import { BonusSection } from '@/components//lp/v5/BonusSection';
import { AmazingGamesSlider } from '@/components//lp/v5/AmazingGamesSlider';
import { TestimonialsSlider } from '@/components//lp/v5/TestimonialsSlider';
import HelpshiftStyles from '@/components/ui/helpshift-styles';
import styles from '@/styles/pages/pageV5.module.scss';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import type { Metadata } from 'next';

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
      <div className={styles.landingPageV5}>
        <Header />
        <MainSectionV8 />
        <DividerSection />
        <ClaimSectionV8 />
        <AmazingGamesSlider />
        <BonusSection />
        <TestimonialsSlider />
        <Footer />
        <HelpshiftStyles />
      </div>
    </>
  );
}

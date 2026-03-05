/* eslint-disable @next/next/no-img-element */
import Script from 'next/script';
import Header from '@/components/lp/v7/Header';
import { Footer } from '@/components/lp/v7/Footer';
import { BonusSlider } from '@/components//lp/v7/BonusSlider';
import { LegendsSection } from '@/components/lp/v10/LegendsSection';
import { TestimonialsSlider } from '@/components//lp/v7/TestimonialsSlider';
import { DividerSectionV10 } from '@/components/lp/v10/DividerSectionV10';
import { MainSectionV10 } from '@/components/lp/v10/MainSectionV10';
import HelpshiftStyles from '@/components/ui/helpshift-styles';
import styles from '@/styles/pages/pageV10.module.scss';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import type { Metadata } from 'next';

//****** Attention! The title and description are different for this landing page!!!!!!!!! ********
export const metadata: Metadata = {
  title: 'LuckyZino | Top Social Casino – Free Slot Games',
  description:
    "Browse and play hundreds of new slot-style games at LuckyZino. Claim your 100% welcome bonus, unlock exclusive offers, and enjoy nonstop entertainment with hourly rewards – all without any purchase necessary.",
  openGraph: {
    title: 'LuckyZino | Top Social Casino – Free Slot Games',
    description:
      "Browse and play hundreds of new slot-style games at LuckyZino. Claim your 100% welcome bonus, unlock exclusive offers, and enjoy nonstop entertainment with hourly rewards – all without any purchase necessary.",
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
      <div id="landingPageV10" className={styles.landingPageV10}>
        <Header />
        <MainSectionV10 />
        <DividerSectionV10 />
        <LegendsSection />
        <DividerSectionV10 />
        <BonusSlider customClassName="testimonialsSliderV10" />
        <TestimonialsSlider customClassName="testimonialsSliderV10" />
        <Footer />
        <HelpshiftStyles />
      </div>
    </>
  );
}

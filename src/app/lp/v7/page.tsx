/* eslint-disable @next/next/no-img-element */
import Script from 'next/script';
import Header from '@/components/lp/v7/Header';
import { Footer } from '@/components/lp/v7/Footer';
import { VideoSection } from '@/components/lp/v7/VideoSection';
import { ExclusiveSection } from '@/components//lp/v7/ExclusiveSection';
import { BonusSlider } from '@/components//lp/v7/BonusSlider';
import { AmazingGamesSlider } from '@/components//lp/v7/AmazingGamesSlider';
import { ProvidersSlider } from '@/components//lp/v7/ProvidersSlider';
import { BenefitSection } from '@/components/lp/v7/BenefitSection';
import { TestimonialsSlider } from '@/components//lp/v7/TestimonialsSlider';
import { ActionSection } from '@/components//lp/v7/ActionSection';
import HelpshiftStyles from '@/components/ui/helpshift-styles';
import styles from '@/styles/pages/pageV7.module.scss';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

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
      <div id="landingPageV7" className={styles.landingPageV7}>
        <Header />
        <VideoSection />
        <ExclusiveSection />
        <BonusSlider customClassName="testimonialsSliderV7" />
        <AmazingGamesSlider />
        <ProvidersSlider />
        <BenefitSection />
        <TestimonialsSlider customClassName="testimonialsSliderV7" />
        <Footer />
        <ActionSection />
        <HelpshiftStyles />
      </div>
    </>
  );
}

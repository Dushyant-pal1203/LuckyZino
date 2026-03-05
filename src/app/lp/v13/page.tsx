import Script from 'next/script';
import Header from '@/components/lp/v7/Header';
import { Footer } from '@/components/lp/v7/Footer';
import { TopContainerV13 } from '@/components//lp/v13/TopContainerV13';
import { BonusSliderV13 } from '@/components//lp/v13/BonusSliderV13';
import { ExclusiveOffer } from '@/components//lp/v13/ExclusiveOffer';
import { LegendsSectionV13 } from '@/components/lp/v13/LegendsSectionV13';
import { OurExclusivesSlider } from '@/components/lp/v13/OurExclusivesSlider';
import { TestimonialsSlider } from '@/components//lp/v7/TestimonialsSlider';
import { DividerSectionV10 } from '@/components/lp/v10/DividerSectionV10';
import { MainSectionV13 } from '@/components/lp/v13/MainSectionV13';
import HelpshiftStyles from '@/components/ui/helpshift-styles';
import styles from '@/styles/pages/pageV13.module.scss';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import type { Metadata } from 'next';
//****** Attention! The title and description are different for this landing page!!!!!!!!! ********
export const metadata: Metadata = {
  title: 'LuckyZino | #1 Social Casino in the U.S.',
  description:
    'Enjoy free social casino games at LuckyZino — play anytime, anywhere, and however you like. No downloads or purchases required, just instant fun and nonstop entertainment.',
  openGraph: {
    title: 'LuckyZino | #1 Social Casino in the U.S.',
    description:
      'Enjoy free social casino games at LuckyZino — play anytime, anywhere, and however you like. No downloads or purchases required, just instant fun and nonstop entertainment.',
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

const page = () => {
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
      <div id="landingPageV13" className={styles.landingPageV13}>
        <div className={styles.landingPageV13topBG}>
          <Header />
          <TopContainerV13 />
          <ExclusiveOffer />
          <div className={styles.waveDecorV13}></div>
        </div>
        <OurExclusivesSlider />
        <MainSectionV13 />
        <DividerSectionV10 />
        <LegendsSectionV13 />
        <DividerSectionV10 />
        <BonusSliderV13 customClassName='' />
        <TestimonialsSlider customClassName="testimonialsSliderV13" />
        <Footer variant="v13" />
        <HelpshiftStyles />
      </div>
    </>
  );
};

export default page;

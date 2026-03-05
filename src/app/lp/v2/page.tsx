/* eslint-disable @next/next/no-img-element */
import Script from 'next/script';
import type { Metadata } from 'next';
import { MainSection } from '@/components/lp/v2/MainSection';
import { Footer } from '@/components/lp/v2/Footer';
import HelpshiftStyles from '@/components/ui/helpshift-styles';
import styles from '@/styles/pages/pageV2.module.scss';
import '@/styles/globals.scss';

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
      <Script
        src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"
        defer
      />
      <div className={styles.landingPageV2}>
        <MainSection mainBtnText='Register Now!' />
        <Footer />
        <HelpshiftStyles />
      </div>
    </>
  );
}

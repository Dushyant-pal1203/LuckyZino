import Script from 'next/script';
import Header from '@/components/lp/v15/Header';
import { Footer } from '@/components/lp/v15/Footer';
import { HeroSection } from '@/components/lp/v15/HeroSection';
import { ExclusiveSection } from '@/components/lp/v15/ExclusiveSection';
import { OurExclusivesSlider } from '@/components/lp/v15/OurExclusivesSlider';
import { MassivePayoutSection } from '@/components/lp/v15/MassivePayoutSection';
import PlayAndWinSection from '@/components/lp/v15/PlayAndWinSection';
import { OurProviders } from '@/components/lp/v15/OurProviders';
import HelpshiftStyles from '@/components/ui/helpshift-styles';
import styles from '@/styles/pages/pageV15.module.scss';
import { TestimonialsSlider } from '@/components/lp/v15/TestimonialsSlider'; // Fixed import path

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import type { Metadata } from 'next';
// //****** Attention! The title and description are different for this landing page!!!!!!!!! ********
// export const metadata: Metadata = {
//   title: 'LuckyZino | Top Social Casino – Free Slot Games',
//   description:
//     'Browse and play hundreds of new slot-style games at LuckyZino. Claim your 100% welcome bonus, unlock exclusive offers, and enjoy nonstop entertainment with hourly rewards – all without any purchase necessary.',
//   openGraph: {
//     title: 'LuckyZino | Top Social Casino – Free Slot Games',
//     description:
//       'Browse and play hundreds of new slot-style games at LuckyZino. Claim your 100% welcome bonus, unlock exclusive offers, and enjoy nonstop entertainment with hourly rewards – all without any purchase necessary.',
//     url: 'https://luckyzino.com',
//     siteName: 'LuckyZino',
//     locale: 'en_US',
//     type: 'website',
//     images: [
//       {
//         url: 'https://luckyzino.com/images/social-preview.jpg',
//         width: 1200,
//         height: 630,
//         alt: 'social-preview'
//       }
//     ]
//   }
// };

const Page = () => { // Capitalized component name (convention)
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
            {/* Main Page Content */}
            <div id="landingPageV15" className={styles.landingPageV15}>
                <Header />
                <HeroSection />
                <ExclusiveSection />
                <PlayAndWinSection />
                <OurExclusivesSlider />
                <OurProviders customClassName="ourProvidersDark hideOnMobile" />
                <MassivePayoutSection />
                <TestimonialsSlider customClassName="testimonialsSliderV9" />
                <Footer />
                <HelpshiftStyles />
            </div>
        </>
    );
};

export default Page; // Capitalized export
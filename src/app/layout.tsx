import './globals.css';
import styles from '@/app/layout.module.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { clsx } from 'clsx';
import Script from 'next/script';
import { isProdEnv } from '@/lib/utils';
import DatadogInit from '@/provider/datadog-provider';
import '@/lib/logging/consolePatch';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LuckyZino | Best Social Casino – Play Free Slot Games Online',
  description:
    'Play the best online social casino slot games at LuckyZino. Enjoy hundreds of exciting free-to-play slots, claim daily rewards, and try your luck at winning big prizes!',
  openGraph: {
    title: 'LuckyZino | Best Social Casino – Play Free Slot Games Online',
    description:
      'Play the best online social casino slot games at LuckyZino. Enjoy hundreds of exciting free-to-play slots, claim daily rewards, and try your luck at winning big prizes!',
    url: 'https://luckyzino.com',
    images: [
      {
        url: 'https://luckyzino.com/images/social-preview.jpg',
        width: 1200,
        height: 630,
        alt: 'social-preview'
      }
    ],
    siteName: 'LuckyZino',
    locale: 'en_US',
    type: 'website'
  }
};

const gtagToken = process.env.NEXT_PUBLIC_G_TAG_SITE_KEY!;
const adustToken = process.env.NEXT_PUBLIC_ADJUST_SITE_KEY!;

export default async function RootLayout({
  children
}: React.PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://connect.facebook.net" />
        <link rel="preconnect" href="https://www.facebook.com" />
        <link rel="preconnect" href="https://cdn.adjust.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, viewport-fit=cover"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        {!isProdEnv() && <meta name="robots" content="noindex, nofollow" />}
        <Script
          strategy="beforeInteractive"
          id="apple-pay"
          src="https://cdn.safecharge.com/safecharge_resources/v1/sc_applepay.min.js"
        ></Script>
        <Script strategy='beforeInteractive' id='apple-pay-wp' crossOrigin="anonymous" src='https://applepay.cdn-apple.com/jsapi/1.latest/apple-pay-sdk.js'></Script>
        <Script
          id="hs-init-script"
          strategy="beforeInteractive"
          src="https://hs-widget.helpshift.com/init.js"
        ></Script>
        <Script
          strategy="beforeInteractive"
          id="gtag"
          dangerouslySetInnerHTML={{
            __html: `
						(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
						new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
						j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
						'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
						})(window,document,'script','dataLayer','${gtagToken}');
					`
          }}
        ></Script>
        <Script
          strategy="beforeInteractive"
          id="hs-init-var"
        >{`window.helpShiftInited = false`}</Script>
      </head>
      <body className={clsx(inter.className, styles.layout)}>
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
        {/*  Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${gtagToken}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <Script
          strategy="beforeInteractive"
          id="adjust-safe-init"
          src="https://cdn.adjust.com/adjust-latest.min.js"
          async
        ></Script>
        <Script id="adjust-atribution">
          {`
						try {
							const adjustReferrer = (new URL(window.location.href)).searchParams.get('adjust_referrer');
							if (adjustReferrer) {
								window.Adjust.setReferrer(encodeURIComponent(adjustReferrer));
							}
							window.Adjust.initSdk({
								appToken: '${adustToken}',
								environment: '${isProdEnv() ? 'production' : 'sandbox'}',
								attributionCallback: function (e, attribution) {
									console.log('Adid: ' + attribution.adid);
									console.log('Tracker Token: ' + attribution.tracker_token);
									console.log('Tracker Name: ' + attribution.tracker_name);
									console.log('Network: ' + attribution.network);
									console.log('Campaign: ' + attribution.campaign);
									console.log('Adgroup: ' + attribution.adgroup);
									console.log('Creative: ' + attribution.creative);
									console.log('Click Label: ' + attribution.click_label);
									console.log('Attribution State: ' + attribution.state);
								},
							});
						} catch (e) {
							console.warn('Adjust init failed');
						}
					`}
        </Script>
        <DatadogInit />
        {children}
      </body>
    </html>
  );
}

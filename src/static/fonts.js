import localFont from 'next/font/local';

export const ExoFont = localFont({
  src: [
    {
      path: './fonts/Exo/Exo2-Bold.ttf',
      weight: 'bold',
      style: '700',
    },
    {
      path: './fonts/Exo/Exo2-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/Exo/Exo2-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/Exo/Exo2-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/Exo/Exo2-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  display: 'swap',
});

export const ExoBlackFont = localFont({
  src: [
    {
      path: './fonts/Exo/Exo2-Black.ttf',
      weight: '900',
      style: 'normal',
    },
  ],
  display: 'swap',
});

export const MullerFont = localFont({
  src: [
    {
      path: './fonts/Muller/Muller-Bold.ttf',
      weight: 'bold',
      style: 'normal',
    },
  ],
  display: 'swap',
});

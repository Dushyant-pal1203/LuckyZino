'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/components/header';
import { clsx } from 'clsx';
import { Suspense } from 'react';
import Footer from './footer';
import FullScreenLoader from './ui/fullscreen-loader';

export default function LayoutWrapper({ children }: React.PropsWithChildren) {
  const pathname = usePathname();

  const isGamePage = pathname?.startsWith('/game');

  const mainClasses = clsx(
    'mx-auto w-full flex flex-col items-center justify-between no-scrollbar layout min-h-[100vh]'
  );

  return (
    <Suspense
      fallback={
        <FullScreenLoader />
      }
    >
      {!isGamePage && <Header />}
      <main className={mainClasses}>
        {children}
        <Footer />
      </main>
    </Suspense>
  );
}

import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { CartProvider } from '../context/CartContext';
import { LoyaltyProvider } from '../context/LoyaltyContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Track page views for analytics
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      // Google Analytics page view tracking
      if (process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID) {
        window.gtag?.('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID, {
          page_path: url,
        });
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <CartProvider>
      <LoyaltyProvider>
        <Component {...pageProps} />
      </LoyaltyProvider>
    </CartProvider>
  );
}

export default MyApp;
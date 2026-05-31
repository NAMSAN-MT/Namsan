import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { NextIntlClientProvider } from 'next-intl';
import GlobalStyle from '@Styles/GlobalStyles';
import { theme } from '@Styles/varialbes.style';
import { defaultLocale } from '@I18n/config';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const locale = pageProps.locale ?? defaultLocale;
  const messages = pageProps.messages ?? {};

  // Start every page at the top — on first load AND on each route change.
  // Skip when the URL carries a hash anchor (e.g. /work/C01/#S0201), which is a
  // deep-link to a section and should keep its scroll target.
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      // stop the browser from restoring the previous scroll position on reload
      window.history.scrollRestoration = 'manual';
    }
    if (!window.location.hash) window.scrollTo(0, 0);

    const handleRouteChange = (url: string) => {
      if (!url.includes('#')) window.scrollTo(0, 0);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => router.events.off('routeChangeComplete', handleRouteChange);
  }, [router]);

  return (
    <ThemeProvider theme={theme}>
      <NextIntlClientProvider
        locale={locale}
        messages={messages}
        timeZone="Asia/Seoul"
      >
        <GlobalStyle />
        <Component {...pageProps} />
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}

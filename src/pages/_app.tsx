import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { NextIntlClientProvider } from 'next-intl';
import GlobalStyle from '@Styles/GlobalStyles';
import { theme } from '@Styles/varialbes.style';
import { defaultLocale } from '@I18n/config';

export default function App({ Component, pageProps }: AppProps) {
  const locale = pageProps.locale ?? defaultLocale;
  const messages = pageProps.messages ?? {};

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

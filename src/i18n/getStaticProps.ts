import type { GetStaticPaths, GetStaticProps } from 'next';
import { locales, type Locale } from './config';
import { getMessages } from './getMessages';

export interface LocalePageProps {
  locale: Locale;
  messages: Record<string, unknown>;
  [key: string]: unknown;
}

export const localePaths = (): ReturnType<GetStaticPaths> => ({
  paths: locales.map(locale => ({ params: { locale } })),
  fallback: false,
});

export const localeProps =
  (extra?: Record<string, unknown>): GetStaticProps<LocalePageProps> =>
  async context => {
    const locale = context.params?.locale as Locale;
    if (!locales.includes(locale)) {
      return { notFound: true };
    }
    return {
      props: {
        locale,
        messages: getMessages(locale),
        ...(extra ?? {}),
      },
    };
  };

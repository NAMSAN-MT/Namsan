import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { defaultLocale } from '@I18n/config';

export default function RootRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace(`/${defaultLocale}/`);
  }, [router]);

  return (
    <Head>
      <meta httpEquiv="refresh" content={`0; url=/${defaultLocale}/`} />
    </Head>
  );
}

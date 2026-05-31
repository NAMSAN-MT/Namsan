import Layout from '@Components/common/Layout/Layout';
import SEO from '@Components/common/Seo/Seo';
import NewsMain from '@Components/news/Main';
import NewsWrapper from '@Components/news/NewsWrapper';
import { locales } from '@I18n/config';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useTranslations } from 'next-intl';
import React from 'react';

interface Props {
  locale: string;
  messages: Record<string, any>;
}

const NewsListPage: React.FC<Props> = () => {
  const t = useTranslations();
  return (
    <Layout route="news">
      <SEO siteUrl="https://www.namsanlaw.com/ko/news" />
      <NewsWrapper
        title={t('common.news')}
        outerPadding="100px 90px 160px;"
        innerWidth="1200px"
      >
        {/* NewsMain runs Algolia search client-side at runtime; no build data. */}
        <NewsMain />
      </NewsWrapper>
    </Layout>
  );
};

export default NewsListPage;

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: locales.map(locale => ({ params: { locale } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const locale = params!.locale as string;
  const { getMessages } = await import('@I18n/getMessages');
  return {
    props: {
      locale,
      messages: getMessages(locale as 'ko' | 'en'),
    },
  };
};

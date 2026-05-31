import Layout from '@Components/common/Layout/Layout';
import SEO from '@Components/common/Seo/Seo';
import NewsMain from '@Components/news/Main';
import { TNewsListItem } from '@Components/news/Main/main.interface';
import NewsWrapper from '@Components/news/NewsWrapper';
import { locales } from '@I18n/config';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useTranslations } from 'next-intl';
import React from 'react';

interface Props {
  locale: string;
  messages: Record<string, any>;
  newsList: TNewsListItem[];
}

const NewsListPage: React.FC<Props> = ({ newsList }) => {
  const t = useTranslations();
  return (
    <Layout route="news">
      <SEO siteUrl="https://www.namsanlaw.com/ko/news" />
      <NewsWrapper
        title={t('common.news')}
        outerPadding="100px 90px 160px;"
        innerWidth="1200px"
      >
        {/* News index is shipped at build; tab-filter/search/pagination run client-side. */}
        <NewsMain newsList={newsList} />
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
  const { getAllNews } = await import('@Server/buildData');
  const { serialize } = await import('@Server/serialize');
  const { getTimestampToDate } = await import('../../utils/date');

  // Build the client-side search index from the same source the detail pages use.
  // Sort newest-first (order desc) to match the old `.sort((a,b) => b.order - a.order)`.
  const all = await getAllNews();
  const newsList: TNewsListItem[] = all
    .slice()
    .sort((a, b) => b.order - a.order)
    .map(n => ({
      documentId: String(n.documentId),
      title: n.title,
      summary: n.summary,
      agency: n.agency,
      newsType: n.newsType as TNewsListItem['newsType'],
      order: n.order,
      // n.date is a compat Timestamp at build (same as the detail page uses);
      // getTimestampToDate calls .toDate(). Emit a STRING so it serializes.
      dateYearMonth: getTimestampToDate(n.date).fullDate,
      content: n.content,
    }));

  return {
    props: serialize({
      locale,
      messages: getMessages(locale as 'ko' | 'en'),
      newsList,
    }),
  };
};

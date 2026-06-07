import { Container } from '@Components/common/Container/Container';
import Layout from '@Components/common/Layout';
import Work from '@Components/work';
import { locales } from '@I18n/config';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useTranslations } from 'next-intl';
import React from 'react';

interface Props {
  categoryInfos: string[][];
  locale: string;
  messages: Record<string, any>;
}

const WorkPage: React.FC<Props> = ({ categoryInfos, locale }) => {
  const t = useTranslations();
  return (
    <Layout>
      <Container title={t('work.title')}>
        <Work categoryInfos={categoryInfos} language={locale} />
      </Container>
    </Layout>
  );
};

export default WorkPage;

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: locales.map(locale => ({ params: { locale } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const locale = params!.locale as string;
  const { getAllWork } = await import('@Server/buildData');
  const { serialize } = await import('@Server/serialize');
  const { getMessages } = await import('@I18n/getMessages');

  // gatsby templates/work.tsx: allWork filter language === locale, sort categoryId ASC
  // (getAllWork is already ordered by categoryId ASC), node.categoryInfo[]
  const work = (await getAllWork()).filter(w => w.language === locale);
  const categoryInfos = work.map(w => w.categoryInfo);

  return {
    props: serialize({
      categoryInfos,
      locale,
      messages: getMessages(locale as 'ko' | 'en'),
    }),
  };
};

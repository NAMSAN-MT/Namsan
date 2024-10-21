import Layout from '@Components/common/Layout';
import Loading from '@Components/common/Loading';
import SEO from '@Components/common/Seo';
import NewsWrapper from '@Components/news/NewsWrapper';
import { News } from '@Interface/api.interface';
import { PageProps } from 'gatsby';
import React, { lazy, Suspense } from 'react';
const NewsDetail = lazy(() => import('@Components/news/NewsDetail/NewsDetail'));

interface _PageProps extends PageProps {
  pageContext: { news: News };
}

const NewsDatil: React.FC<_PageProps> = ({ pageContext: { news } }) => {
  return (
    <Layout route="newsDetail">
      <NewsWrapper outerPadding="100px 90px 160px" innerWidth="996px">
        <Suspense fallback={<Loading height="500px" />}>
          <NewsDetail {...news} />
        </Suspense>
      </NewsWrapper>
    </Layout>
  );
};

export default NewsDatil;

export const Head: React.FC<_PageProps> = ({ pageContext: { news } }) => {
  return (
    <SEO
      siteUrl={news?.originalLink ?? undefined}
      title={news?.title ?? undefined}
      ogTitle={news?.title ?? undefined}
      description={news?.summary ?? undefined}
      ogDescription={news?.summary ?? undefined}
      ogUrl={news?.originalLink ?? undefined}
    />
  );
};

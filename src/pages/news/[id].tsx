import Layout from '@Components/common/Layout';
import Loading from '@Components/common/Loading';
import NewsWrapper from '@Components/news/NewsWrapper';
import { News } from '@Interface/api.interface';
import { PageProps } from 'gatsby';
import { injectIntl, WrappedComponentProps } from 'gatsby-plugin-intl';
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

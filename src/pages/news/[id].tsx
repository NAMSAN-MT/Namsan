import Layout from '@Components/common/Layout';
import Loading from '@Components/common/Loading';
import NewsWrapper from '@Components/news/NewsWrapper';
import { News } from '@Interface/api.interface';
import { graphql, PageProps } from 'gatsby';
import React, { lazy, Suspense } from 'react';
const NewsDetail = lazy(() => import('@Components/news/NewsDetail/NewsDetail'));

const NewsDatil: React.FC<PageProps & News> = ({ data }) => {
  const newsData = (data as any).news;

  return (
    <Layout route="newsDetail">
      <NewsWrapper outerPadding="100px 90px 160px" innerWidth="996px">
        <Suspense fallback={<Loading height="500px" />}>
          <NewsDetail {...newsData} />
        </Suspense>
      </NewsWrapper>
    </Layout>
  );
};

export default NewsDatil;

export const query = graphql`
  query ($id: String) {
    news(id: { eq: $id }) {
      newsType
      originalLink
      title
      date
      content
      agency
    }
  }
`;

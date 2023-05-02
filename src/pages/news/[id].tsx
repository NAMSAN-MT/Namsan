import React from 'react';
import { PageProps } from 'gatsby';
import Layout from '@Components/common/Layout';
import { News } from '@Interface/api.interface';
import NewsWrapper from '@Components/news/NewsWrapper';
import Loading from '@Components/common/Loading';
const NewsDetail = React.lazy(
  () => import('@Components/news/NewsDetail/NewsDetail'),
);

const NewsDatil: React.FC<PageProps & News> = () => {
  return (
    <Layout route="newsDetail">
      <NewsWrapper outerPadding="100px 90px 160px" innerWidth="996px">
        <React.Suspense fallback={<Loading height="500px" />}>
          <NewsDetail />
        </React.Suspense>
      </NewsWrapper>
    </Layout>
  );
};

export default NewsDatil;

// export const getServerData = async (props: GetServerDataProps) => {
//   const id = props.params?.id as string;
//   const newsData = await getNewsData(id).catch(error => ({
//     headers: { status: 400 },
//     props: {},
//   }));

//   return { props: { ...newsData } };
// };

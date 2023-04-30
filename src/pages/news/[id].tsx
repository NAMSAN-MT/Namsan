import React from 'react';
import { GetServerDataProps, PageProps } from 'gatsby';

import Layout from '@Components/common/Layout';
import { getNewsData } from '@Api/news.api';
import { News } from '@Interface/api.interface';
import NewsDetail from '@Components/news/NewsDetail/NewsDetail';
import NewsWrapper from '@Components/news/NewsWrapper';

const NewsDatil: React.FC<PageProps & News> = ({ serverData }) => {
  return (
    <Layout route="newsDetail">
      <NewsWrapper outerPadding="100px 90px 160px" innerWidth="996px">
        <NewsDetail {...(serverData as News)} />
      </NewsWrapper>
    </Layout>
  );
};

export default NewsDatil;

export const getServerData = async (props: GetServerDataProps) => {
  const id = props.params?.id as string;
  const newsData = await getNewsData(id).catch(error => ({
    headers: { status: 400 },
    props: {},
  }));

  return { props: { ...newsData } };
};

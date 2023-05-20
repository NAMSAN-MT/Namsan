import Layout from '@Components/common/Layout';
import NewsMain from '@Components/news/Main';
import NewsWrapper from '@Components/news/NewsWrapper';
import { NewsType } from '@Type/api.type';
import { GetServerDataProps, PageProps } from 'gatsby';
import * as React from 'react';
import styled from 'styled-components';

const Main: React.FC<PageProps> = () => {
  return (
    <Layout>
      <NewsWrapper
        title="남산소식"
        outerPadding="100px 90px 160px;"
        innerWidth="1200px"
      >
        <NewsMain />
      </NewsWrapper>
    </Layout>
  );
};

export default Main;

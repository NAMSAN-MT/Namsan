import { PageProps } from 'gatsby';
import React from 'react';
import IntroduceWrapper from '@Components/introduce/IntroduceWrapper';
import Layout from '@Components/common/Layout';
import SEO from '@Components/common/Seo/Seo';

const Introduce: React.FC<PageProps> = () => {
  return (
    <Layout>
      <IntroduceWrapper>
        <div></div>
      </IntroduceWrapper>
    </Layout>
  );
};

export default Introduce;

export const Head = () => (
  <SEO siteUrl="https://www.namsanlaw.com/ko/introduce" />
);

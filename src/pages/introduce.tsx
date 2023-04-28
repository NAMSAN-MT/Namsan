import { PageProps } from 'gatsby';
import React from 'react';
import IntroduceWrapper from '@Components/introduce/IntroduceWrapper';
import Layout from '@Components/common/Layout';

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

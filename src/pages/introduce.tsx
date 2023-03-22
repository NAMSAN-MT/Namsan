import { PageProps } from 'gatsby';
import React from 'react';
import AppLayout from '@Components/common/Layout';
import IntroduceWrapper from '@Components/introduce/IntroduceWrapper';

const Introduce: React.FC<PageProps> = () => {
  return (
    <AppLayout>
      <IntroduceWrapper>
        <div></div>
      </IntroduceWrapper>
    </AppLayout>
  );
};

export default Introduce;

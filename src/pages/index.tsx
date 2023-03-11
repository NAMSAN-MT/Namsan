import * as React from 'react';
import { PageProps } from 'gatsby';
import AppLayout from '@Components/common/Layout';
import FirstSection from '@Components/main/FirstSection';
import SecondSection from '@Components/main/SecondSection';
import ThirdSection from '@Components/main/ThirdSection';
import ForthSection from '@Components/main/ForthSection';
import FifthSection from '@Components/main/FifthSection';

const Main: React.FC<PageProps> = () => {
  return (
    <AppLayout>
      <FirstSection />
      <SecondSection />
      <ThirdSection />
      <ForthSection />
      <FifthSection />
    </AppLayout>
  );
};

export default Main;

import * as React from 'react';
import { PageProps } from 'gatsby';
import AppLayout from '@Components/common/Layout';
import FirstSection from '@Components/main/FirstSection';
import SecondSection from '@Components/main/SecondSection';
import ThirdSection from '@Components/main/ThirdSection';
const ForthSection = React.lazy(() => import('@Components/main/ForthSection'));
import FifthSection from '@Components/main/FifthSection';

const Main: React.FC<PageProps> = () => {
  const isSSR = typeof window === 'undefined';
  return (
    <AppLayout>
      <FirstSection />
      <SecondSection />
      <ThirdSection />
      {!isSSR && (
        // FIXME: Fallback Skeleton으로 전환하기
        <React.Suspense fallback={<div>loading</div>}>
          <ForthSection />
        </React.Suspense>
      )}
      <FifthSection />
    </AppLayout>
  );
};

export default Main;

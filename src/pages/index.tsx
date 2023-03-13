import * as React from 'react';
import { PageProps } from 'gatsby';
import AppLayout from '@Components/common/Layout';
const FirstSection = React.lazy(() => import('@Components/main/FirstSection'));
import SecondSection from '@Components/main/SecondSection';
const ThirdSection = React.lazy(() => import('@Components/main/ThirdSection'));
const ForthSection = React.lazy(() => import('@Components/main/ForthSection'));
import FifthSection from '@Components/main/FifthSection';

const Main: React.FC<PageProps> = () => {
  const isSSR = typeof window === 'undefined';
  return (
    <AppLayout>
      {!isSSR && (
        // FIXME: Fallback Skeleton으로 전환하기
        <React.Suspense fallback={<div>loading</div>}>
          <FirstSection />
        </React.Suspense>
      )}
      <SecondSection />
      {!isSSR && (
        // FIXME: Fallback Skeleton으로 전환하기
        <React.Suspense fallback={<div>loading</div>}>
          <ThirdSection />
        </React.Suspense>
      )}
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

import * as React from 'react';
import { PageProps } from 'gatsby';
import AppLayout from '@Components/common/Layout';
const FirstSection = React.lazy(() => import('@Components/main/FirstSection'));
import SecondSection from '@Components/main/SecondSection';
const ThirdSection = React.lazy(() => import('@Components/main/ThirdSection'));
const ForthSection = React.lazy(() => import('@Components/main/ForthSection'));
import FifthSection from '@Components/main/FifthSection';
import Skeleton from '@Components/common/Skeleton';

const Main: React.FC<PageProps> = () => {
  const isSSR = typeof window === 'undefined';

  return (
    <AppLayout>
      {!isSSR && (
        <React.Suspense fallback={<Skeleton count={3} height={200} />}>
          <FirstSection />
        </React.Suspense>
      )}
      <SecondSection />
      {!isSSR && (
        <React.Suspense fallback={<Skeleton count={2} />}>
          <ThirdSection />
        </React.Suspense>
      )}
      {!isSSR && (
        <React.Suspense fallback={<Skeleton count={3} />}>
          <ForthSection />
        </React.Suspense>
      )}
      <FifthSection />
    </AppLayout>
  );
};

export default Main;

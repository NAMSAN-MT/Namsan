import Skeleton from '@Components/common/Skeleton';
import FifthSection from '@Components/main/FifthSection';
import SecondSection from '@Components/main/SecondSection';
import { PageProps } from 'gatsby';
import * as React from 'react';
const FirstSection = React.lazy(() => import('@Components/main/FirstSection'));
const ThirdSection = React.lazy(() => import('@Components/main/ThirdSection'));
const ForthSection = React.lazy(() => import('@Components/main/ForthSection'));

const Main: React.FC<PageProps> = () => {
  const isSSR = typeof window === 'undefined';

  return (
    <>
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
    </>
  );
};

export default Main;

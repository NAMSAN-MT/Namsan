import Layout from '@Components/common/Layout';
import Skeleton from '@Components/common/Skeleton';
import FifthSection from '@Components/main/FifthSection';
import SecondSection from '@Components/main/SecondSection';
import useResize from '@Hooks/useResize';
import { PageProps } from 'gatsby';
import * as React from 'react';
const FirstSection = React.lazy(() => import('@Components/main/FirstSection'));
const ThirdSection = React.lazy(() => import('@Components/main/ThirdSection'));
const ForthSection = React.lazy(() => import('@Components/main/ForthSection'));

const Main: React.FC<PageProps> = () => {
  const { isMobile } = useResize();
  return (
    <Layout>
      <React.Suspense fallback={<Skeleton count={3} height={200} />}>
        <FirstSection />
      </React.Suspense>
      <SecondSection isMobile={isMobile} />
      <React.Suspense fallback={<Skeleton count={2} />}>
        <ThirdSection isMobile={isMobile} />
      </React.Suspense>
      <React.Suspense fallback={<Skeleton count={3} />}>
        <ForthSection isMobile={isMobile} />
      </React.Suspense>
      <FifthSection isMobile={isMobile} />
    </Layout>
  );
};

export default Main;

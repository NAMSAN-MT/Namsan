import Layout from '@Components/common/Layout';
import Loading from '@Components/common/Loading';
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
    <Layout route="main">
      <React.Suspense fallback={<Loading height="500px" />}>
        <FirstSection />
      </React.Suspense>
      <SecondSection isMobile={isMobile} />
      <React.Suspense fallback={<Loading height="500px" />}>
        <ThirdSection isMobile={isMobile} />
      </React.Suspense>
      <React.Suspense fallback={<Loading height="500px" />}>
        <ForthSection isMobile={isMobile} />
      </React.Suspense>
      <FifthSection isMobile={isMobile} />
    </Layout>
  );
};

export default Main;

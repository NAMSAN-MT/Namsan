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
  const { isMobile, isTablet, isDesktop } = useResize();
  const [isTransparent, setIsTransparent] = React.useState(false);
  const eventBus = (isView: boolean) => {
    setIsTransparent(isView);
  };
  return (
    <Layout route="main" isMobile={isMobile} isTransparent={isTransparent}>
      <React.Suspense fallback={<Loading height="500px" />}>
        <FirstSection isDesktop={isDesktop} eventBus={eventBus} />
      </React.Suspense>
      <SecondSection isMobile={isMobile} />
      <React.Suspense fallback={<Loading height="500px" />}>
        <ThirdSection isMobile={isMobile} />
      </React.Suspense>
      <React.Suspense fallback={<Loading height="500px" />}>
        <ForthSection isMobile={isMobile} isTablet={isTablet} />
      </React.Suspense>
      <FifthSection isMobile={isMobile} />
    </Layout>
  );
};

export default Main;

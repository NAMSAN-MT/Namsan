import Layout from '@Components/common/Layout';
import Loading from '@Components/common/Loading';
import SEO from '@Components/common/Seo/Seo';
import FifthSection from '@Components/main/FifthSection';
import SecondSection from '@Components/main/SecondSection';
import useResize from '@Hooks/useResize';
import * as React from 'react';
import { localePaths, localeProps } from '@I18n/getStaticProps';

const FirstSection = React.lazy(() => import('@Components/main/FirstSection'));
const ThirdSection = React.lazy(() => import('@Components/main/ThirdSection'));
const ForthSection = React.lazy(() => import('@Components/main/ForthSection'));

const Main = () => {
  const { isMobile, isTablet, isDesktop } = useResize();
  const [isTransparent, setIsTransparent] = React.useState(false);
  const eventBus = (isView: boolean) => {
    setIsTransparent(isView);
  };
  return (
    <>
      <SEO />
      <Layout route="main" isMobile={isMobile} isTransparent={isTransparent}>
        <React.Suspense fallback={<Loading height="500px" />}>
          <FirstSection
            isMobile={isMobile}
            isDesktop={isDesktop}
            eventBus={eventBus}
          />
        </React.Suspense>
        <SecondSection isMobile={isMobile} />
        <React.Suspense fallback={<Loading height="500px" />}>
          <ThirdSection isMobile={isMobile} isTablet={isTablet} />
        </React.Suspense>
        <React.Suspense fallback={<Loading height="500px" />}>
          <ForthSection isMobile={isMobile} isTablet={isTablet} />
        </React.Suspense>
        <FifthSection isMobile={isMobile} />
      </Layout>
    </>
  );
};

export default Main;

export const getStaticPaths = localePaths;
export const getStaticProps = localeProps();

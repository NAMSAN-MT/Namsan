import Layout from '@Components/common/Layout';
import Loading from '@Components/common/Loading';
import SEO from '@Components/common/Seo/Seo';
import FifthSection from '@Components/main/FifthSection';
import SecondSection from '@Components/main/SecondSection';
import useResize from '@Hooks/useResize';
import dynamic from 'next/dynamic';
import * as React from 'react';
import { localePaths, localeProps } from '@I18n/getStaticProps';

const FirstSection = dynamic(() => import('@Components/main/FirstSection'), {
  loading: () => <Loading height="500px" />,
});
const ThirdSection = dynamic(() => import('@Components/main/ThirdSection'), {
  loading: () => <Loading height="500px" />,
});
const ForthSection = dynamic(() => import('@Components/main/ForthSection'), {
  loading: () => <Loading height="500px" />,
});

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
        <FirstSection
          isMobile={isMobile}
          isDesktop={isDesktop}
          eventBus={eventBus}
        />
        <SecondSection isMobile={isMobile} />
        <ThirdSection isMobile={isMobile} isTablet={isTablet} />
        <ForthSection isMobile={isMobile} isTablet={isTablet} />
        <FifthSection isMobile={isMobile} />
      </Layout>
    </>
  );
};

export default Main;

export const getStaticPaths = localePaths;
export const getStaticProps = localeProps();

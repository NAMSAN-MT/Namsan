import React from 'react';
import IntroduceWrapper from '@Components/introduce/IntroduceWrapper';
import Layout from '@Components/common/Layout';
import SEO from '@Components/common/Seo/Seo';
import { localePaths, localeProps, type LocalePageProps } from '@I18n/getStaticProps';

const Introduce = ({ locale }: LocalePageProps) => {
  return (
    <>
      <SEO siteUrl={`https://www.namsanlaw.com/${locale}/introduce`} />
      <Layout>
        <IntroduceWrapper>
          <div></div>
        </IntroduceWrapper>
      </Layout>
    </>
  );
};

export default Introduce;

export const getStaticPaths = localePaths;
export const getStaticProps = localeProps();

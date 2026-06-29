import React from 'react';
import ContactSection from '@Components/contact/ContactSection';
import RecruiteSection from '@Components/contact/RecruiteSection';
import ContactWrapper from '@Components/contact/ContactWrapper';
import Layout from '@Components/common/Layout';
import { DividerWrapper } from '@Components/contact/Divider/Divider.style';
import SEO from '@Components/common/Seo/Seo';
import { localePaths, localeProps, type LocalePageProps } from '@I18n/getStaticProps';

const Contact = ({ locale }: LocalePageProps) => {
  return (
    <>
      <SEO siteUrl={`https://www.namsanlaw.com/${locale}/contact`}>
        <script
          type="text/javascript"
          src="https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=r3n2d43r6e"
        />
      </SEO>
      <Layout>
        <ContactWrapper>
          <ContactSection />
          <DividerWrapper />
          <RecruiteSection />
        </ContactWrapper>
      </Layout>
    </>
  );
};

export default Contact;

export const getStaticPaths = localePaths;
export const getStaticProps = localeProps();

import React from 'react';
import { PageProps } from 'gatsby';
import ContactSection from '@Components/contact/ContactSection';
import RecruiteSection from '@Components/contact/RecruiteSection';
import ContactWrapper from '@Components/contact/ContactWrapper';
import Layout from '@Components/common/Layout';
import { DividerWrapper } from '@Components/contact/Divider/Divider.style';
import SEO from '@Components/common/Seo/Seo';

const Contact: React.FC<PageProps> = () => {
  return (
    <Layout>
      <ContactWrapper>
        <ContactSection />
        <DividerWrapper />
        <RecruiteSection />
      </ContactWrapper>
    </Layout>
  );
};

export default Contact;

export function Head() {
  return (
    <SEO siteUrl="https://www.namsanlaw.com/ko/contact">
      <script
        type="text/javascript"
        src="https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=r3n2d43r6e"
      />
    </SEO>
  );
}

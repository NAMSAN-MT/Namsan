import React from 'react';
import { PageProps } from 'gatsby';
import ContactSection from '@Components/contact/ContactSection';
import RecruiteSection from '@Components/contact/RecruiteSection';
import ContactWrapper from '@Components/contact/ContactWrapper';
import Layout from '@Components/common/Layout';
import { DividerWrapper } from '@Components/contact/Divider/Divider.style';

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

export function Head() {
  return (
    <>
      <script
        type="text/javascript"
        src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=r3n2d43r6e"
      ></script>
    </>
  );
}

export default Contact;

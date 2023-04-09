import React from 'react';
import { PageProps } from 'gatsby';
import ContactSection from '@Components/contact/ContactSection';
import RecruiteSection from '@Components/contact/RecruiteSection';
import Divider from '@Components/common/Divider';
import ContactWrapper from '@Components/contact/ContactWrapper';
import Layout from '@Components/common/Layout';

const Contact: React.FC<PageProps> = () => {
  return (
    <Layout>
      <ContactWrapper>
        <ContactSection />
        <Divider />
        <RecruiteSection />
      </ContactWrapper>
    </Layout>
  );
};

export default Contact;

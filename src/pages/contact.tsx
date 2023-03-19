import React from 'react';
import { PageProps } from 'gatsby';
import AppLayout from '@Components/common/Layout';
import ContactSection from '@Components/contact/ContactSection';
import RecruiteSection from '@Components/contact/RecruiteSection';
import Divider from '@Components/common/Divider';
import ContactWrapper from '@Components/contact/ContactWrapper';

const Contact: React.FC<PageProps> = () => {
  return (
    <AppLayout>
      <ContactWrapper>
        <ContactSection />
        <Divider />
        <RecruiteSection />
      </ContactWrapper>
    </AppLayout>
  );
};

export default Contact;

import React from 'react';
import { PageProps } from 'gatsby';
import AppLayout from '@Components/common/Layout';
import ContactSection from '@Components/contact/ContactSection';
import RecruiteSection from '@Components/contact/RecruiteSection';
import Divider from '@Components/contact/Divider';

const Contact: React.FC<PageProps> = () => {
  return (
    <AppLayout>
      <ContactSection />
      <Divider />
      <RecruiteSection />
    </AppLayout>
  );
};

export default Contact;

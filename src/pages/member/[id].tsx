import React from 'react';
import { PageProps } from 'gatsby';
import Member from '@Components/member/Member';
import Layout from '@Components/common/Layout';

const MemberPage: React.FC<PageProps> = ({ pageContext }) => {
  const { id } = pageContext as { id: string };

  return (
    <Layout>
      <Member id={id} />
    </Layout>
  );
};

export default MemberPage;

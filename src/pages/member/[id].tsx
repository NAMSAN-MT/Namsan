import React from 'react';
import { PageProps } from 'gatsby';
import Member from '@Components/member/Member';
import Layout from '@Components/common/Layout';

const MemberPage: React.FC<PageProps> = ({ pageContext: { member } }: any) => {
  return (
    <Layout>
      <Member member={member} />
    </Layout>
  );
};

export default MemberPage;

import React from 'react';
import { PageProps } from 'gatsby';
import Member from '@Components/member/Member';
import Layout from '@Components/common/Layout';

const MemberPage: React.FC<PageProps> = ({ params }) => {
  const { id: idStr } = params;
  const id = Number(idStr);

  return (
    <Layout>
      <Member id={id} />
    </Layout>
  );
};

export default MemberPage;

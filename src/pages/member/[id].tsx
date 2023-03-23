import React from 'react';
import AppLayout from '@Components/common/Layout';
import { PageProps } from 'gatsby';
import Member from '@Components/member/Member';

const MemberPage: React.FC<PageProps> = ({ params }) => {
  const { id: idStr } = params;
  const id = Number(idStr);

  return (
    <AppLayout>
      <div>
        <Member id={id} />
      </div>
    </AppLayout>
  );
};

export default MemberPage;

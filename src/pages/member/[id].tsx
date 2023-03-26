import React from 'react';
import { PageProps } from 'gatsby';
import Member from '@Components/member/Member';

const MemberPage: React.FC<PageProps> = ({ params }) => {
  const { id: idStr } = params;
  const id = Number(idStr);

  return (
    <div>
      <Member id={id} />
    </div>
  );
};

export default MemberPage;

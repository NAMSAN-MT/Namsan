import { PageProps } from 'gatsby';
import React from 'react';
import AppLayout from '@Components/common/Layout';
import MembersWrapper from '@Components/members/MembersWrapper';
import MembersTitle from '@Components/members/MembersTitle';
import SearchBar from '@Components/members/SearchBar';
import MemberList from '@Components/members/MemberList';

const Members: React.FC<PageProps> = () => {
  return (
    <AppLayout>
      <MembersWrapper>
        <MembersTitle />
        <SearchBar />
        <MemberList />
      </MembersWrapper>
    </AppLayout>
  );
};

export default Members;

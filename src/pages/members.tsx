import { PageProps } from 'gatsby';
import React from 'react';
import MembersWrapper from '@Components/members/MembersWrapper';
import MembersTitle from '@Components/members/MembersTitle';
import SearchBar from '@Components/members/SearchBar';
import MemberList from '@Components/members/MemberList';

const Members: React.FC<PageProps> = () => {
  return (
    <MembersWrapper>
      <MembersTitle />
      <SearchBar />
      <MemberList />
    </MembersWrapper>
  );
};

export default Members;

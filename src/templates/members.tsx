import { PageProps } from 'gatsby';
import React, { useEffect } from 'react';
import MembersWrapper from '@Components/members/MembersWrapper';
import MembersTitle from '@Components/members/MembersTitle';
import SearchBar from '@Components/members/SearchBar';
import MemberList from '@Components/members/MemberList';
import Layout from '@Components/common/Layout';
import { WrappedComponentProps, injectIntl } from 'gatsby-plugin-intl';
import { IMember } from '@Interface/api.interface';

const Members: React.FC<PageProps & WrappedComponentProps> = ({
  pageContext: { members, workMap },
  intl,
}: any) => {
  const filteredMembersWithLanguage = members.filter(
    (member: IMember) => member.language === intl.locale,
  );

  return (
    <Layout>
      <MembersWrapper>
        <MembersTitle />
        <SearchBar members={filteredMembersWithLanguage} workMap={workMap} />
        <MemberList members={filteredMembersWithLanguage} />
      </MembersWrapper>
    </Layout>
  );
};

export default injectIntl(Members);

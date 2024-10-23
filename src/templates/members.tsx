import Layout from '@Components/common/Layout';
import MemberList from '@Components/members/MemberList';
import MembersTitle from '@Components/members/MembersTitle';
import MembersWrapper from '@Components/members/MembersWrapper';
import SearchBar from '@Components/members/SearchBar';
import { IMember } from '@Interface/api.interface';
import { PageProps } from 'gatsby';
import { WrappedComponentProps, injectIntl } from 'gatsby-plugin-intl';
import React from 'react';

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

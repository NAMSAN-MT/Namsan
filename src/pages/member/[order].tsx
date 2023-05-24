import React from 'react';
import { PageProps } from 'gatsby';
import Member from '@Components/member/Member';
import Layout from '@Components/common/Layout';
import { WrappedComponentProps, injectIntl } from 'gatsby-plugin-intl';

const MemberPage: React.FC<PageProps & WrappedComponentProps> = ({
  pageContext: { members, order },
  intl,
}: any) => {
  const member = members?.find(
    (member: any) => member.order === order && member.language === intl.locale,
  );

  return (
    <Layout>
      <Member member={member} />
    </Layout>
  );
};

export default injectIntl(MemberPage);

import Layout from '@Components/common/Layout';
import SEO from '@Components/common/Seo/Seo';
import Member from '@Components/member/Member';
import { PageProps } from 'gatsby';
import { WrappedComponentProps, injectIntl } from 'gatsby-plugin-intl';
import React from 'react';

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

export const Head = ({ pageContext: { members, order } }: any) => {
  const member = members?.find(
    (member: any) => member.order === order && member.language === 'ko',
  );

  return (
    <SEO
      siteUrl="https://www.namsanlaw.com/ko/members"
      title={member?.name ?? undefined}
      ogTitle={member?.name ?? undefined}
      description={member?.description ?? undefined}
      ogDescription={member?.description ?? undefined}
      ogUrl="https://www.namsanlaw.com/ko/members"
    />
  );
};

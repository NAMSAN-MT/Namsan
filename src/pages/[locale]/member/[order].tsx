import Layout from '@Components/common/Layout';
import SEO from '@Components/common/Seo/Seo';
import Member from '@Components/member/Member';
import { locales } from '@I18n/config';
import { IMember } from '@Interface/api.interface';
import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';

interface Props {
  member: IMember | null;
  locale: string;
  messages: Record<string, any>;
}

const MemberPage: React.FC<Props> = ({ member }) => {
  return (
    <>
      <SEO
        siteUrl="https://www.namsanlaw.com/ko/members"
        title={member?.name ?? undefined}
        ogTitle={member?.name ?? undefined}
        description={member?.description ?? undefined}
        ogDescription={member?.description ?? undefined}
        ogUrl="https://www.namsanlaw.com/ko/members"
      />
      <Layout>{member && <Member member={member} />}</Layout>
    </>
  );
};

export default MemberPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const { buildContextMembers } = await import('@Server/buildMembers');
  const members = await buildContextMembers();

  // gatsby created /member/<order> per member; here cartesian locale × order.
  // order is identical across languages, so dedupe by order then × locales.
  const orders = Array.from(new Set(members.map(m => String(m.order))));
  const paths = locales.flatMap(locale =>
    orders.map(order => ({ params: { locale, order } })),
  );

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const locale = params!.locale as string;
  const order = params!.order as string;

  const { buildContextMembers } = await import('@Server/buildMembers');
  const { serialize } = await import('@Server/serialize');
  const { getMessages } = await import('@I18n/getMessages');

  const members = await buildContextMembers();
  // gatsby filtered: member.order === order && member.language === locale
  const member =
    members.find(m => String(m.order) === order && m.language === locale) ??
    null;

  return {
    props: serialize({
      member,
      locale,
      messages: getMessages(locale as 'ko' | 'en'),
    }),
  };
};

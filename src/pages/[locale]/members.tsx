import Layout from '@Components/common/Layout';
import MemberList from '@Components/members/MemberList';
import MembersTitle from '@Components/members/MembersTitle';
import MembersWrapper from '@Components/members/MembersWrapper';
import SearchBar from '@Components/members/SearchBar';
import { locales } from '@I18n/config';
import { IMember } from '@Interface/api.interface';
import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';

interface Props {
  members: IMember[];
  workMap: Record<string, string>;
  locale: string;
  messages: Record<string, any>;
}

const Members: React.FC<Props> = ({ members, workMap }) => (
  <Layout>
    <MembersWrapper>
      <MembersTitle />
      <SearchBar members={members} workMap={workMap} />
      <MemberList members={members} />
    </MembersWrapper>
  </Layout>
);

export default Members;

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: locales.map(locale => ({ params: { locale } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const locale = params!.locale as string;
  const { buildContextMembers } = await import('@Server/buildMembers');
  const { getAllWork } = await import('@Server/buildData');
  const { serialize } = await import('@Server/serialize');
  const { getMessages } = await import('@I18n/getMessages');

  const all = await buildContextMembers();
  const members = all.filter(m => m.language === locale); // gatsby: language === intl.locale

  // gatsby workMap: { categoryInfo[0]: categoryId } over allWork sorted categoryId ASC
  const work = await getAllWork();
  const workMap = work.reduce<Record<string, string>>((acc, w) => {
    if (w.categoryInfo?.[0] !== undefined) acc[w.categoryInfo[0]] = w.categoryId;
    return acc;
  }, {});

  return {
    props: serialize({
      members,
      workMap,
      locale,
      messages: getMessages(locale as 'ko' | 'en'),
    }),
  };
};

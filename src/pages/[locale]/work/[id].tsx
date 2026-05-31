import Layout from '@Components/common/Layout/Layout';
import SEO from '@Components/common/Seo/Seo';
import DetailPage, { MiniMember } from '@Components/work/DetailPage';
import { locales } from '@I18n/config';
import { RemoteImage } from '@Interface/image.interface';
import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';

interface Props {
  id: string;
  locale: string;
  categoryTitle: string[];
  description: string[];
  mainMemberData: MiniMember[];
  subMemberData: MiniMember[];
  backgroundImage: RemoteImage | null;
  messages: Record<string, any>;
}

const WorkDetail: React.FC<Props> = props => {
  // All sections start closed so the server HTML and the client's first paint
  // match (no hydration mismatch). The hash-anchored section (#S0201) is opened
  // AFTER mount inside DetailPage's effect — reading window.location.hash here
  // (server '' vs client '#S0201') was the mismatch.
  const information = (props.categoryTitle ?? []).map((title, index) => ({
    categoryTitle: title,
    description: props.description[index],
    isOpen: false,
    isFirstTime: true,
  }));

  const description = information.map(i => i.categoryTitle).join(', ');
  const title = information.map(i => i.categoryTitle)[0];

  return (
    <Layout route="workDetail">
      <SEO
        siteUrl="https://www.namsanlaw.com/ko/work"
        title={title ?? undefined}
        ogTitle={title ?? undefined}
        description={description ?? undefined}
        ogDescription={description ?? undefined}
        ogUrl="https://www.namsanlaw.com/ko/members"
      />
      <DetailPage
        id={props.id}
        language={props.locale as 'ko' | 'en'}
        mainMemberData={props.mainMemberData}
        subMemberData={props.subMemberData}
        workInfo={information}
        backgroundImage={props.backgroundImage ?? undefined}
        subId={-1}
      />
    </Layout>
  );
};

export default WorkDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  const { getAllWork } = await import('@Server/buildData');
  const work = await getAllWork();
  // gatsby: one page per work categoryId (path /work/${categoryId}).
  // work is per-language (each categoryId exists in both ko & en), so dedupe
  // categoryId then take the cartesian product with locales.
  const ids = Array.from(new Set(work.map(w => w.categoryId)));
  const paths = locales.flatMap(locale =>
    ids.map(id => ({ params: { locale, id } })),
  );
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const locale = params!.locale as string;
  const id = params!.id as string;

  const { getAllWork, resolveImage } = await import('@Server/buildData');
  const { buildContextMembers } = await import('@Server/buildMembers');
  const { serialize } = await import('@Server/serialize');
  const { getMessages } = await import('@I18n/getMessages');

  // gatsby getWorkInformation: work(categoryId eq id, language eq locale).
  const allWork = await getAllWork();
  const work =
    allWork.find(w => w.categoryId === id && w.language === locale) ?? null;

  // gatsby resolved main/sub against contextMembers (full set) but the original
  // [id].tsx re-merged a language-filtered allMembers query over those — so the
  // rendered member was always the correct-language doc. Members share emails
  // across ko/en (same `order` code), so we filter by locale up-front, which
  // reproduces that final result without the redundant re-merge.
  const members = await buildContextMembers();
  const byLocale = members.filter(m => m.language === locale);

  // gatsby getContextMemberData: each email -> matching contextMember.
  // allMembers query sorted order ASC (order is a string code e.g. "L003").
  const resolve = (emails: string[]): MiniMember[] =>
    (emails ?? [])
      .map(email => byLocale.find(m => m.email === email))
      .filter((m): m is NonNullable<typeof m> => Boolean(m))
      .sort((a, b) => a.order.localeCompare(b.order))
      .map(m => ({
        id: m.id,
        email: m.email,
        name: m.name,
        position: m.position,
        order: m.order,
        image: m.image,
        bgImage: m.bgImage,
        businessFields: m.businessFields,
      }));

  // Real intrinsic dims (resolveImage) — keeps the banner's aspect. src:'' (a
  // missing Storage object) → null so DetailPage's guard skips it.
  const bgImage = work?.imagePath ? await resolveImage(work.imagePath) : null;

  return {
    props: serialize({
      id,
      locale,
      categoryTitle: work?.categoryInfo ?? [],
      description: work?.description ?? [],
      mainMemberData: resolve(work?.member?.main ?? []),
      subMemberData: resolve(work?.member?.sub ?? []),
      backgroundImage: bgImage?.src ? bgImage : null,
      messages: getMessages(locale as 'ko' | 'en'),
    }),
  };
};

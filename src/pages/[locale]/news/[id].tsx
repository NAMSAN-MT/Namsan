import Layout from '@Components/common/Layout/Layout';
import Loading from '@Components/common/Loading';
import SEO from '@Components/common/Seo/Seo';
import NewsWrapper from '@Components/news/NewsWrapper';
import { News } from '@Interface/api.interface';
import { locales } from '@I18n/config';
import { GetStaticPaths, GetStaticProps } from 'next';
import React, { lazy, Suspense } from 'react';

const NewsDetail = lazy(() => import('@Components/news/NewsDetail/NewsDetail'));

interface Props {
  news: News;
  locale: string;
  messages: Record<string, any>;
}

// Per-page OG: each statically-exported news page carries its own meta
// (title/summary/image). This replaces the old Firebase `news` function that
// rewrote OG tags at request time (firebase.json **/news/** rewrite).
const NewsDetailPage: React.FC<Props> = ({ news }) => {
  return (
    <Layout route="newsDetail">
      <SEO
        siteUrl={news?.originalLink ?? undefined}
        title={news?.title ?? undefined}
        ogTitle={news?.title ?? undefined}
        description={news?.summary ?? undefined}
        ogDescription={news?.summary ?? undefined}
        ogUrl={news?.originalLink ?? undefined}
        ogImage={news?.newsImageData?.src || undefined}
      />
      <NewsWrapper outerPadding="100px 90px 160px" innerWidth="996px">
        <Suspense fallback={<Loading height="500px" />}>
          <NewsDetail {...news} />
        </Suspense>
      </NewsWrapper>
    </Layout>
  );
};

export default NewsDetailPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const { getAllNews } = await import('@Server/buildData');
  const news = await getAllNews();
  // gatsby created one page per news doc (path /news/${node.id}); Gatsby's
  // `node.id` was the Firestore document id, which the client SDK exposes as
  // `documentId` (the `id` field on the doc itself is unused/empty). This is
  // the same key Card links to (/news/${documentId}) and getNewsMember queries.
  // News has no `language` field, so every doc is rendered for both locales.
  const paths = locales.flatMap(locale =>
    news.map(n => ({ params: { locale, id: String(n.documentId) } })),
  );
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const locale = params!.locale as string;
  const id = params!.id as string;

  const { getAllNews, resolveImage } = await import('@Server/buildData');
  const { serialize } = await import('@Server/serialize');
  const { getMessages } = await import('@I18n/getMessages');

  const all = await getAllNews();
  const node = all.find(n => String(n.documentId) === id)!;
  const len = all.length;

  // verbatim port of gatsby-node prev/next-by-order (lines 337-360)
  let prev: number | undefined;
  let next: number | undefined;
  if (len > 1) {
    if (node.order === 1) {
      prev = node.order + 1;
      next = undefined;
    } else if (len === node.order) {
      prev = undefined;
      next = node.order - 1;
    } else {
      prev = node.order + 1;
      next = node.order - 1;
    }
  }

  // gatsby getOrderNews: the news with that `order`, shaped as { id, title }.
  // `id` is the documentId so NewsDetail's prev/next nav (/news/${id}) resolves.
  const byOrder = (o?: number) => {
    const m = o !== undefined ? all.find(n => n.order === o) : undefined;
    return m ? { id: String(m.documentId), title: m.title } : undefined;
  };

  // gatsby onCreateNode guarded `isEmpty(node.imagePath)`; build the image only
  // when a path exists. resolveImage gives REAL intrinsic dims (news photos vary
  // in aspect — a fixed nominal would squish non-3:2 uploads) and returns src:''
  // for a missing Storage object, which we map to undefined.
  const resolved = node.imagePath
    ? await resolveImage(node.imagePath)
    : undefined;
  const newsImageData = resolved?.src ? resolved : undefined;

  // `News.date` is typed Timestamp (the client SDK shape NewsDetail's
  // convertDateStr/news.api consume at runtime). A Timestamp is not
  // JSON-serializable — serialize would flatten it to {seconds,nanoseconds}
  // and break `new Date(String(date))`. We emit an ISO string at build time
  // (convertDateStr accepts `any` and parses it); cast the field back to the
  // shared `News` shape so the prop contract is preserved.
  const news = {
    ...node,
    // gatsby's node.id was the Firestore doc id; expose it as `id` so
    // NewsDetail's getNewsMember(id) (client-side member lookup) keys correctly.
    id: node.documentId,
    // NewsDoc marks these optional; the shared `News` shape requires them and
    // gatsby's news docs always carried them. Coalesce to '' to satisfy both.
    originalLink: node.originalLink ?? '',
    imagePath: node.imagePath ?? '',
    // NewsDoc types newsType as plain string; News uses the NewsType union.
    newsType: node.newsType as News['newsType'],
    date: node.date.toDate().toISOString() as unknown as News['date'],
    prevNews: byOrder(prev),
    nextNews: byOrder(next),
    newsImageData,
  };

  return {
    props: serialize({
      // serialize turns every undefined (prevNews/nextNews/newsImageData) -> null.
      news,
      locale,
      messages: getMessages(locale as 'ko' | 'en'),
    }),
  };
};

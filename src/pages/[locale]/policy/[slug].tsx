import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import rehypeRaw from 'rehype-raw';
import { locales, defaultLocale, Locale } from '@I18n/config';
import { getMessages } from '@I18n/getMessages';
import Layout from '@Components/common/Layout';
import SEO from '@Components/common/Seo/Seo';
import { PolicyStyleBox } from '@Components/policy/Policy.style';

const POLICY_DIR = path.join(process.cwd(), 'src/content/policy');

// frontmatter slug has a leading slash ('/privacy') -> strip it for the route param
const slugFromFile = (file: string): string => {
  const raw = fs.readFileSync(path.join(POLICY_DIR, file), 'utf8');
  const { data } = matter(raw);
  return String(data.slug ?? `/${file.replace(/\.md$/, '')}`).replace(/^\//, '');
};

const readPolicyFiles = (): string[] =>
  fs.readdirSync(POLICY_DIR).filter((f) => f.endsWith('.md'));

interface PolicyPageProps {
  content: string;
  title: string;
  locale: Locale;
  messages: Record<string, unknown>;
}

const PolicyTemplate = ({ content, locale }: PolicyPageProps) => {
  return (
    <>
      <SEO siteUrl={`https://www.namsanlaw.com/${locale}/policy`} />
      <Layout>
        <PolicyStyleBox>
          <ReactMarkdown
            remarkPlugins={[remarkBreaks]}
            rehypePlugins={[rehypeRaw]}
          >
            {content}
          </ReactMarkdown>
        </PolicyStyleBox>
      </Layout>
    </>
  );
};

export default PolicyTemplate;

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = readPolicyFiles().map(slugFromFile); // ['privacy', 'disclaimer']
  const paths = locales.flatMap((locale) =>
    slugs.map((slug) => ({ params: { locale, slug } })),
  );
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<PolicyPageProps> = async ({
  params,
}) => {
  const locale = (params?.locale as Locale) ?? defaultLocale;
  const slug = params?.slug as string;

  // locate the .md whose (slash-stripped) frontmatter slug matches the route param
  const file =
    readPolicyFiles().find((f) => slugFromFile(f) === slug) ?? `${slug}.md`;
  const raw = fs.readFileSync(path.join(POLICY_DIR, file), 'utf8');
  const { content, data } = matter(raw);

  const messages = getMessages(locale);

  return {
    props: { content, title: String(data.title ?? ''), locale, messages },
  };
};

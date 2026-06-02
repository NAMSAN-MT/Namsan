import * as React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const pageStyles: React.CSSProperties = {
  color: '#232129',
  padding: '96px',
  fontFamily: '-apple-system, Roboto, sans-serif, serif',
};
const headingStyles: React.CSSProperties = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 320,
};
const paragraphStyles: React.CSSProperties = {
  marginBottom: 48,
};

const NotFoundPage = () => {
  return (
    <>
      <Head>
        <title>Not found</title>
      </Head>
      <main style={pageStyles}>
        <h1 style={headingStyles}>페이지를 찾을 수 없습니다 / Page not found</h1>
        <p style={paragraphStyles}>
          요청하신 페이지를 찾을 수 없습니다.
          <br />
          Sorry, we couldn’t find what you were looking for.
          <br />
          <br />
          <Link href="/ko/">홈으로 / Go home</Link>
        </p>
      </main>
    </>
  );
};

export default NotFoundPage;

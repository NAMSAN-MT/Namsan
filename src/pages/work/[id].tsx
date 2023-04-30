import Layout from '@Components/common/Layout/Layout';
import DetailPage from '@Components/work/DetailPage';
import React from 'react';

interface Props {
  id: string;
  pageContext: { language: 'ko' | 'en' };
}

export default (props: Props) => {
  const { pageContext, id } = props;
  const router = (
    <Layout route="workDetail">
      <DetailPage id={id} lang={pageContext.language} />
    </Layout>
  );
  return router;
};

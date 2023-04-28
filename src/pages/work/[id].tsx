import Layout from '@Components/common/Layout/Layout';
import DetailPage from '@Components/work/DetailPage';
import { PageProps } from 'gatsby';
import React from 'react';

export default ({ pageContext }: PageProps) => {
  const { id } = pageContext as { id: string };

  const router = (
    <Layout route="workDetail">
      <DetailPage id={id}></DetailPage>
    </Layout>
  );
  return router;
};

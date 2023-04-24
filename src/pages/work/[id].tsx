import Layout from '@Components/common/Layout/Layout';
import DetailPage from '@Components/work/DetailPage';
import { PageProps } from 'gatsby';
import React from 'react';

export default ({ params }: PageProps) => {
  const id = params?.id as string;
  const router = (
    <Layout route="workDetail">
      <DetailPage id={id}></DetailPage>
    </Layout>
  );
  return router;
};

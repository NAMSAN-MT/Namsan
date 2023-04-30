import Layout from '@Components/common/Layout/Layout';
import DetailPage from '@Components/work/DetailPage';
import { WrappedComponentProps, injectIntl } from 'gatsby-plugin-intl';
import React from 'react';

interface Props {
  id: string;
  pageContext: { language: 'ko' | 'en' };
}

const Detail = (props: WrappedComponentProps & Props) => {
  const { pageContext, id } = props;
  const router = (
    <Layout route="workDetail">
      <DetailPage id={id} lang={pageContext.language} />
    </Layout>
  );
  return router;
};

export const getServerData = async (props: WrappedComponentProps) => {
  return {
    props,
  };
};

export default injectIntl(Detail);

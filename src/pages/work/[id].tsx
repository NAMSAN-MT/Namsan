import Layout from '@Components/common/Layout/Layout';
import DetailPage from '@Components/work/DetailPage';
import { IGatsbyImageData } from 'gatsby-plugin-image';
import { WrappedComponentProps, injectIntl } from 'gatsby-plugin-intl';
import React from 'react';

export interface DetailProps {
  id: string;
  pageContext: {
    language: 'ko' | 'en';
    mainMemberData: miniMember[];
    subMemberData: miniMember[];
  };
}

export interface miniMember {
  bgImagePath: string;
  businessFields: string[];
  id: string;
  imagePath: string;
  language: 'ko' | 'en';
  name: string;
  order: number;
  position: string;
  image: IGatsbyImageData;
}

const Detail = ({ pageContext, id }: WrappedComponentProps & DetailProps) => {
  const router = (
    <Layout route="workDetail">
      <DetailPage id={id} lang={pageContext.language} {...pageContext} />
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

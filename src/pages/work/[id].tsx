import Layout from '@Components/common/Layout/Layout';
import DetailPage from '@Components/work/DetailPage';
import { PageProps, graphql } from 'gatsby';
import { IGatsbyImageData } from 'gatsby-plugin-image';
import { WrappedComponentProps, injectIntl } from 'gatsby-plugin-intl';
import React from 'react';

export interface DetailProps {
  id: string;
  pageContext: PageContextProps;
  data: {
    work: workInfomation;
  };
}

export interface PageContextProps extends WrappedComponentProps {
  language: 'ko' | 'en';
  mainMemberData: miniMember[];
  subMemberData: miniMember[];
  workInfo: {
    categoryTitle: string;
    description: string;
  }[];
  imagePath: string;
  id: string;
}

type workInfomation = {
  categoryTitle: string[];
  description: string[];
  imagePath: string;
};

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
  bgImage: IGatsbyImageData;
}

const Detail = (props: WrappedComponentProps & DetailProps & PageProps) => {
  const { pageContext, data, location } = props;
  const subId = Number(location.hash?.slice(-2)) ?? -1;
  const infomation = data.work.categoryTitle?.map((title, index) => ({
    categoryTitle: title,
    description: data.work.description[index],
    isOpen: index === subId,
  }));

  return (
    <Layout route="workDetail">
      <DetailPage
        {...{
          ...pageContext,
          workInfo: infomation,
          imagePath: data.work.imagePath,
          location,
          subId,
        }}
      />
    </Layout>
  );
};

export const query = graphql`
  query ($id: String, $language: String) {
    work(categoryId: { eq: $id }, language: { eq: $language }) {
      categoryTitle: categoryInfo
      description
      imagePath
    }
  }
`;

export default injectIntl(Detail);

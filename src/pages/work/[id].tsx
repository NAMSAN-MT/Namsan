import Layout from '@Components/common/Layout/Layout';
import DetailPage from '@Components/work/DetailPage';
import { graphql } from 'gatsby';
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

const Detail = ({ pageContext, data }: WrappedComponentProps & DetailProps) => {
  const infomation = data.work.categoryTitle?.map((title, index) => ({
    categoryTitle: title,
    description: data.work.description[index],
  }));

  return (
    <Layout route="workDetail">
      <DetailPage
        {...{
          ...pageContext,
          workInfo: infomation,
          imagePath: data.work.imagePath,
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

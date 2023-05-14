import { Container } from '@Components/common/Container/Container';
import Layout from '@Components/common/Layout';
import Work from '@Components/work';
import { PageProps, graphql } from 'gatsby';
import { WrappedComponentProps, injectIntl } from 'gatsby-plugin-intl';
import React from 'react';

export interface ServerProps {
  allWork: { edges: { node: { categoryInfo: string[] } }[] };
}

interface Props extends WrappedComponentProps {
  data: ServerProps;
}

const Index = (props: PageProps & Props) => {
  const { intl, data } = props;
  const categoryInfos = data.allWork.edges.map(({ node }) => node.categoryInfo);
  return (
    <Layout>
      <Container title={intl.formatMessage({ id: 'work.title' })}>
        <Work {...{ categoryInfos, language: intl.locale }} />
      </Container>
    </Layout>
  );
};

export const query = graphql`
  query ($language: String) {
    allWork(
      filter: { language: { eq: $language } }
      sort: { categoryId: ASC }
    ) {
      edges {
        node {
          categoryId
          categoryInfo
        }
      }
    }
  }
`;
export default injectIntl(Index);

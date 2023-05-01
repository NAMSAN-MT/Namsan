import { Container } from '@Components/common/Container/Container';
import Layout from '@Components/common/Layout';
import Work from '@Components/work';
import { GetServerDataProps, PageProps } from 'gatsby';
import { WrappedComponentProps, injectIntl } from 'gatsby-plugin-intl';
import React from 'react';

export interface ServerProps {
  data: { node: { categoryInfo: string[] } }[];
}

interface Props extends WrappedComponentProps {
  pageContext: ServerProps;
}

const Index = (props: PageProps & Props) => {
  const { pageContext, intl } = props;
  console.log(props);
  const data = pageContext?.data?.map(({ node }) => node.categoryInfo);
  return (
    <Layout>
      <Container title={intl.formatMessage({ id: 'work.title' })}>
        <Work {...{ data }} />
      </Container>
    </Layout>
  );
};

export default injectIntl(Index);

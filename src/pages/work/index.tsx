import { getWorkFields } from '@Api/work.api';
import { Container } from '@Components/common/Container/Container';
import Layout from '@Components/common/Layout';
import Work from '@Components/work';
import { GetServerDataProps, PageProps } from 'gatsby';
import { WrappedComponentProps, injectIntl } from 'gatsby-plugin-intl';
import React from 'react';

export interface ServerProps {
  data: string[][];
}

interface Props extends WrappedComponentProps {
  serverData: ServerProps;
}

const Index = (props: PageProps & Props) => {
  const { serverData, intl } = props;
  return (
    <Layout>
      <Container title={intl.formatMessage({ id: 'work.title' })}>
        <Work {...serverData} />
      </Container>
    </Layout>
  );
};

export default injectIntl(Index);

export const getServerData = async (props: GetServerDataProps) => {
  try {
    const data = await getWorkFields<string[]>(
      ['categoryInfo'],
      (props.pageContext.intl as { language: string })?.language,
    );
    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {},
    };
  }
};

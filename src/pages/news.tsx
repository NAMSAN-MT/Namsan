import Layout from '@Components/common/Layout';
import NewsMain from '@Components/news/Main';
import NewsWrapper from '@Components/news/NewsWrapper';
import { WrappedComponentProps, injectIntl } from 'gatsby-plugin-intl';
import * as React from 'react';

const Main = (props: WrappedComponentProps) => {
  return (
    <Layout route="news">
      <NewsWrapper
        title={props.intl.formatMessage({
          id: 'common.news',
        })}
        outerPadding="100px 90px 160px;"
        innerWidth="1200px"
      >
        <NewsMain />
      </NewsWrapper>
    </Layout>
  );
};

export default injectIntl(Main);

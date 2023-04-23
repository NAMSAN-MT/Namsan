import Layout from '@Components/common/Layout';
import NewsMain from '@Components/news/Main';
import { flex, font, mediaQuery, size } from '@Styles/mixin.style';
import { NewsType } from '@Type/api.type';
import { GetServerDataProps, PageProps } from 'gatsby';
import * as React from 'react';
import styled from 'styled-components';

const Main: React.FC<PageProps> = props => {
  return (
    <Layout>
      <Wrapper>
        <Header>
          <Title>남산소식</Title>
        </Header>
        <NewsMain />
      </Wrapper>
    </Layout>
  );
};

export default Main;

export const getServerData = async (props: GetServerDataProps) => {
  const {
    page,
    mediaType = 'all',
    keyword,
  } = props.query as {
    page?: string;
    mediaType?: NewsType;
    keyword?: string;
  };
  console.log('>> props query: ', page, mediaType, keyword);

  return { props: { page, mediaType, keyword } };
};

const Wrapper = styled.section`
  max-width: 1200px;

  padding: 0 296px;
  background-color: ${({ theme }) => theme.color.textWhiteHigh};
  margin-top: 101px;

  ${mediaQuery(
    'mobile',
    `
    font-family: 'Noto Sans CJK KR';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 36px;
    letter-spacing: -0.4px;padding: 0 24px;
  `,
  )}

  .loading_cards {
    ${flex()}
    ${size('500px', '1200px')}
  }
`;

const Header = styled.div`
  ${size('100%', '100%')};
  ${flex('space-between', 'center')};
`;

const Title = styled.div`
  ${size('60px', '146px')}
  left: 360px;
  top: 185px;

  font-family: 'Noto Sans CJK KR';
  font-style: normal;
  line-height: 60px;
  letter-spacing: -0.6px;
  ${font('display40', 'bold')}

  color: ${({ theme }) => theme.color.textBlackHigh};
`;

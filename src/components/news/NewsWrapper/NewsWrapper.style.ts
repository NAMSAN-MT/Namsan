import { flex, font, mediaQuery, size } from '@Styles/mixin.style';
import styled from 'styled-components';

export const NewsWrapper = styled.section`
  max-width: 1200px;

  padding: 0 296px;
  background-color: ${({ theme }) => theme.color.textWhiteHigh};
  margin-top: 101px;

  font-family: 'Noto Sans CJK KR';
  font-style: normal;

  & > p {
    font-family: 'Noto Sans CJK KR';
    font-style: normal;
  }

  .loading_cards {
    ${flex()}
    ${size('500px', '1200px')}
  }

  ${mediaQuery(
    'tablet1024',
    `
      max-width: 100%;
      grid-template-columns: repeat(2, 1fr);
      padding: 0px 90px;
    `,
  )};

  ${mediaQuery(
    'mobile',
    ` 
      ${font('mobile24', 'bold')}
      letter-spacing: -0.4px;
      line-height: 36px;
      padding: 0 24px;
    `,
  )}
`;

export const Header = styled.div`
  ${size('100%', '100%')};
  ${flex('space-between', 'center')};
`;

export const Title = styled.div`
  ${size('60px', '146px')}
  left: 360px;
  top: 185px;

  ${font('display40', 'bold')}
  line-height: 60px;
  letter-spacing: -0.6px;

  color: ${({ theme }) => theme.color.textBlackHigh};
`;

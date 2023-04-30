import { flex, font, lineHeight, mediaQuery, size } from '@Styles/mixin.style';
import styled from 'styled-components';

export const Outer = styled.section`
  padding: 100px 90px;
  box-sizing: content-box;

  background-color: ${({ theme }) => theme.color.textWhiteHigh};

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
  ${mediaQuery('tablet1024', `padding: 60px 40px;`)}
  ${mediaQuery('mobile', ` padding: 0 24px;`)}
`;

export const Inner = styled.div`
  width: 1200px;
  margin: 0 auto;

  ${mediaQuery('pc1278', `width: 100%;`)}
`;

export const Title = styled.h1`
  ${font('display40', 'bold')}
  ${lineHeight(40, 60)}
  letter-spacing: -0.6px;

  color: ${({ theme }) => theme.color.textBlackHigh};
  ${mediaQuery('mobile', ` padding-top: 48px;`)}
`;

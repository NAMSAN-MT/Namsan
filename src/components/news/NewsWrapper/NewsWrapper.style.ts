import { flex, font, lineHeight, mediaQuery, size } from '@Styles/mixin.style';
import styled from 'styled-components';
import { InnerWidth, OuterPadding } from './NewsWrapper.interface';

export const Outer = styled.section<OuterPadding>`
  padding: ${props => props.outerPadding};
  box-sizing: content-box;
  background-color: ${({ theme }) => theme.color.textWhiteHigh};

  .loading_cards {
    ${flex()}
    ${size('500px', '1200px')}
    min-width: 1025px;
  }
  ${mediaQuery('tablet1024', `padding: 60px 40px 160px;`)}
  ${mediaQuery('mobile', ` padding: 32px 24px 100px;`)}
`;

export const Inner = styled.div<InnerWidth>`
  width: ${props => props.innerWidth};
  margin: 0 auto;

  ${mediaQuery('pc1278', `width: 100%;`)}
`;

export const Title = styled.h1`
  ${font('display40', 'bold')}
  ${lineHeight(40, 60)}
  letter-spacing: -0.6px;

  color: ${({ theme }) => theme.color.textBlackHigh};
  ${mediaQuery(
    'mobile',
    ` 
    ${font('mobile24', 'bold')}
    ${lineHeight(24, 36)}
    // padding-top: 48px;
  `,
  )}
`;

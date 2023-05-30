import { flex, font, lineHeight, mediaQuery, size } from '@Styles/mixin.style';
import styled from 'styled-components';

const AnimationImageWrapper = styled.div<{ src: string }>`
  position: relative;
  ${size('880px')}
  background: url(${({ src }) => src});
  background-size: cover;
  ${flex('center')}

  ${mediaQuery(
    'mobile',
    `
    ${size('520px')};
    background-position-x: -300px;
  `,
  )}
`;

const Background = styled.img`
  ${size('100%', '100%')};
`;

const Dim = styled.div`
  ${size('100%', '100%')};
  background-color: ${({ theme }) => theme.color.backgroundDim};
  position: absolute;
  top: 0;
  opacity: 0;

  &.on {
    opacity: 1;
    transition: opacity 0.5s ease;
  }
`;

const TextWrapper = styled.div`
  width: 1200px;
  position: absolute;
  top: 364px;
  bottom: 363px;
  margin: 0 auto;
  /* left: 360px; */
  white-space: pre-wrap;
  color: ${({ theme }) => theme.color.textWhiteHigh};
  opacity: 0;
  transform: translateY(100%);
  height: fit-content;

  ${mediaQuery('pc1380', `left: 90px;`)}
  ${mediaQuery('tablet1024', `left: 40px; width: auto;`)}
  ${mediaQuery('mobile', `width: 327px;top: 149px; bottom: 149px; left: 24px;`)}

  &.on {
    opacity: 1;
    transform: translateY(-50%);
    transition: all 0.5s;
    top: 50%;
  }
`;

const MainText = styled.div`
  ${font('display42', 'bold')};
  ${lineHeight(42, 60)};
  letter-spacing: -0.6px;
  margin-bottom: 28px;

  ${mediaQuery(
    'mobile',
    `
    ${font('mobile24', 'bold')};
    ${lineHeight(24, 36)};
    letter-spacing: -0.4px;
    margin-bottom: 16px;
  `,
  )};
`;

const SubText = styled.div`
  ${font('title26', 'regular')};
  ${lineHeight(26, 40)}
  letter-spacing: -0.4px;

  ${mediaQuery(
    'mobile',
    `
    ${font('mobile16', 'regular')};
    ${lineHeight(16, 26)};
    letter-spacing: -0.2px;
  `,
  )}
`;

export {
  AnimationImageWrapper,
  Background,
  Dim,
  TextWrapper,
  MainText,
  SubText,
};

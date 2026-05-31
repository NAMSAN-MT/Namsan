import { flex, font, lineHeight, mediaQuery } from '@Styles/mixin.style';
import { motion } from 'framer-motion';
import styled, { keyframes } from 'styled-components';

const WithFixedWrapper = styled.div`
  padding: 0 90px;
  ${mediaQuery(
    'tablet1024',
    `
      padding: 0 40px;
    `,
  )};
  ${mediaQuery(
    'mobile',
    `
      padding: 0;
    `,
  )};
`;

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const FirstWrapper = styled.div`
  ${flex()};
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 760px;
  overflow: hidden;
  ${mediaQuery(
    'mobile',
    `
      height: 560px;
    `,
  )};
`;

const boxScale = keyframes`
  0% {
    scale: 1;
  }
  100% {
    scale: 1.1;
  }
`;

const ScaleWrapper = styled(FirstWrapper)`
  img {
    object-fit: cover;
  }
  // animation: ${boxScale} 1s ease-in-out alternate;
`;

// crossfade 레이어: 두 레이어를 항상 겹쳐 두고 opacity만 전환한다.
// (static↔absolute 스왑은 전환 순간 flex reflow를 일으켜 세로 점프가 보였음)
const Layer = styled.div<{ $active: boolean }>`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  transition: opacity 1s ease-in;
  pointer-events: ${({ $active }) => ($active ? 'auto' : 'none')};
`;

// 컨테이너(고정 높이)를 꽉 채워 로드 전부터 박스를 예약 → 초기 CLS 방지.
// object-fit: cover로 종횡비 유지(왜곡 없음), 기존 width:auto 중앙 크롭과 동일한 프레이밍.
const IntroImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const TextWrapper = styled(motion.div)<{ $visible: boolean }>`
  position: absolute;
  visibility: ${({ $visible }) => ($visible ? 'visible' : 'hidden')};
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 1s ease-in;
`;

const Basic = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.color.textWhiteHigh};
`;

const Title = styled(Basic)`
  letter-spacing: 5px;
  text-transform: uppercase;
  font-family: FHAlphaTestLight;
  ${font('display100', 'demilight')}
  ${lineHeight(100, 140)};

  ${mediaQuery(
    'mobile',
    `
    text-transform: none;
    font-family: 'noto-sans-cjk-kr', sans-serif;
    font-style: normal;
    ${font('title30', 'bold')};
    ${lineHeight(30, 42)};
    width: 275px;
    letter-spacing: 0;
    word-break: keep-all;
  `,
  )}
`;

const SubTitle = styled(Basic)`
  ${font('title30', 'regular')}
  ${lineHeight(30, 36)};

  ${({ theme }) =>
    mediaQuery(
      'mobile',
      `
    ${font('mobile16', 'medium')};
    ${lineHeight(16, 19.09)};
    letter-spacing: -0.5px;
    margin-top: 18px;
    color: rgba(255, 255, 255, 0.6);
    
  `,
    )}
`;

const Description = styled(Basic)`
  letter-spacing: -0.4px;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 20px;
  ${font('title26', 'medium')}
  ${lineHeight(26, 40)};
`;

export {
  WithFixedWrapper,
  Wrapper,
  FirstWrapper,
  Layer,
  IntroImg,
  Title,
  SubTitle,
  Description,
  TextWrapper,
  ScaleWrapper,
};

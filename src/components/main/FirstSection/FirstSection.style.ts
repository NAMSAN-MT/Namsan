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

const FrirstWrapper = styled.div`
  ${flex()};
  flex-direction: column;
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

const ScaleWrapper = styled(FrirstWrapper)`
  // animation: ${boxScale} 1s ease-in-out alternate;
`;

const TextWrapper = styled(motion.div)`
  position: absolute;
`;

const Basic = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.color.textWhiteHigh};
`;

const Title = styled(Basic)`
  letter-spacing: 5px;
  text-transform: uppercase;
  font-family: 'FHAlphaTestLight';
  ${font('display100', 'demilight')}
  ${lineHeight(100, 140)}};
`;

const SubTitle = styled(Basic)`
  ${font('title30', 'regular')}
  ${lineHeight(30, 36)}};
`;
const Description = styled(Basic)`
  letter-spacing: -0.4px;
  color: ${({ theme }) => theme.color.textWhiteDisable};
  margin-top: 20px;
  opacity: 0.6;
  ${font('title26', 'medium')}
  ${lineHeight(26, 40)}};
`;

export {
  WithFixedWrapper,
  Wrapper,
  FrirstWrapper,
  Title,
  SubTitle,
  Description,
  TextWrapper,
  ScaleWrapper,
};

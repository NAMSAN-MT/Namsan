import { font, lineHeight, size } from '@Styles/mixin.style';
import styled from 'styled-components';

const AnimationImageWrapper = styled.div`
  position: relative;
  ${size('995px')}
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
  position: absolute;
  top: 364px;
  bottom: 363px;
  left: 360px;
  white-space: pre-wrap;
  color: ${({ theme }) => theme.color.textWhiteHigh};
  opacity: 0;
  transform: translateY(100%);

  &.on {
    opacity: 1;
    transform: translateY(0);
    transition: all 0.5s;
  }
`;

const MainText = styled.div`
  ${font('display42', 'bold')};
  ${lineHeight(42, 60)};
  letter-spacing: -0.6px;
`;

const SubText = styled.div`
  ${font('title26', 'regular')};
  ${lineHeight(26, 40)}
  letter-spacing: -0.4px;
`;

export {
  AnimationImageWrapper,
  Background,
  Dim,
  TextWrapper,
  MainText,
  SubText,
};

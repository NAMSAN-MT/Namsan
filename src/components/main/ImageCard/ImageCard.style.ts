import { flex, lineHeight } from '@Styles/mixin.style';
import styled from 'styled-components';

const CardWrapper = styled.div<{ url: string }>`
  ${flex()};
  width: 282px;
  height: 320px;
  background: ${({ url }) => `url(${url}) no-repeat`};
  text-align: center;
  color: ${({ theme }) => theme.color.textWhiteHigh};

  //FIXME: mixin으로 변경
  font-size: 20px;
  font-weight: 700;
  ${lineHeight(20, 34)};
`;

export { CardWrapper };

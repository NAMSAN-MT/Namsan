import { flex, mediaQuery } from '@Styles/mixin.style';
import styled from 'styled-components';

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const FrirstWrapper = styled.div`
  ${flex()};
  flex-direction: column;
  width: 100%;
  background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.1) 0%,
      rgba(0, 0, 0, 5e-5) 50%
    ),
    ${({ theme }) => theme.color.blue100};
  video {
    object-fit: cover;
  }
  ${mediaQuery(
    'mobile',
    `
      height: 560px;
    `,
  )};
`;

export { Wrapper, FrirstWrapper };

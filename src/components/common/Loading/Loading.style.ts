import { flex } from '@Styles/mixin.style';
import styled from 'styled-components';

const LoadingWrapper = styled.div<{ height: string }>`
  ${flex('center', 'center')};
  width: 100%;
  height: ${({ height }) => height};
`;

export { LoadingWrapper };

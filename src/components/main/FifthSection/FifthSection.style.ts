import { flex } from '@Styles/mixin.style';
import styled from 'styled-components';
import { Wrapper } from '../FirstSection/FirstSection.style';

const FifthWrapper = styled(Wrapper)`
  background-color: ${({ theme }) => theme.color.textWhiteHigh};
  margin-top: 150px;
  margin-bottom: 160px;
`;

const InnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 calc((100% - 1290px) / 2);
  ${flex()}
`;

export { InnerWrapper, FifthWrapper };

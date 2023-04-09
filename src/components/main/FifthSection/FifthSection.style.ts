import { flex, mediaQuery } from '@Styles/mixin.style';
import styled from 'styled-components';
import { Wrapper } from '../FirstSection/FirstSection.style';

const FifthWrapper = styled(Wrapper)`
  background-color: ${({ theme }) => theme.color.textWhiteHigh};
  margin-top: 150px;
  margin-bottom: 160px;
  ${mediaQuery(
    'mobile',
    `
     margin-top: 60px;
     margin-bottom: 100px;
    `,
  )};
`;

const InnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 calc((100% - 1290px) / 2);
  ${flex()}
  ${mediaQuery(
    'mobile',
    `
    ${flex('center', 'center')};
    flex-direction: column;
    gap: 24px;
    padding: 0 24px;
    `,
  )};
`;

export { InnerWrapper, FifthWrapper };

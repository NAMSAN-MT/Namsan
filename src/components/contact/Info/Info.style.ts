import { flex, font, lineHeight, mediaQuery } from '@Styles/mixin.style';
import styled from 'styled-components';

const Info = styled.div`
  ${flex('center', 'flex-start')}
  flex-direction: column;
  white-space: break-spaces;
  margin-bottom: 60px;
  &:last-child {
    margin-bottom: 0px;
  }

  ${mediaQuery('mobile', `margin-bottom: 28px;`)};
`;

const Title = styled.div`
  ${font('list20', 'regular')}
  color: rgba(6, 11, 17, 0.56);
  line-height: 34px;
  margin-bottom: 8px;

  ${mediaQuery(
    'mobile',
    `
  ${font('mobile14', 'bold')};
  ${lineHeight(14, 24)};
  letter-spacing: -0.1px;
  `,
  )};
`;

const Content = styled.div`
  ${font('title26', 'bold')}
  line-height: 40px;
  letter-spacing: -0.4px;

  ${mediaQuery(
    'mobile',
    `
  ${font('mobile16', 'bold')};
  ${lineHeight(16, 26)};
  `,
  )};
`;

const InfoWrapper = styled.div`
  ${flex('flex-start', 'flex-start')};
  width: 100%;
  gap: 180px;
  margin-bottom: 80px;

  ${mediaQuery(
    'mobile',
    `
  flex-direction: column;
  gap: 28px;
  margin-bottom: 48px;
  `,
  )};
`;

const InfoColumn = styled.div`
  width: 441px;
`;

export { Info, Title, Content, InfoWrapper, InfoColumn };

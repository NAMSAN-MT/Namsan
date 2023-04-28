import { flex, font, lineHeight, mediaQuery } from '@Styles/mixin.style';
import styled from 'styled-components';

const Info = styled.div`
  ${flex('center', 'flex-start')}
  flex-direction: column;
  white-space: break-spaces;
  margin-bottom: 60px;

  ${mediaQuery('tablet1024', `margin-bottom: 32px;`)};
`;

const Title = styled.div`
  ${font('list20', 'regular')}
  color: rgba(6, 11, 17, 0.56);
  line-height: 34px;
  margin-bottom: 8px;

  ${mediaQuery(
    'tablet1024',
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

  ${mediaQuery(
    'tablet1024',
    `
  ${font('mobile16', 'bold')};
  ${lineHeight(16, 26)};
  `,
  )};
`;

const InfoWrapper = styled.div`
  ${flex('flex-start', 'flex-start')};
  width: 100%;

  ${mediaQuery('tablet1024', `flex-direction: column;`)};
`;

const InfoColumn = styled.div`
  width: 50%;
`;

export { Info, Title, Content, InfoWrapper, InfoColumn };

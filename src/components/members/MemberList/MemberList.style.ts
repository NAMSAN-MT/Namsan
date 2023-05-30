import { flex, font, lineHeight, mediaQuery } from '@Styles/mixin.style';
import styled from 'styled-components';

const MemberList = styled.ul`
  ${flex('flex-start')}
  flex-wrap: wrap;
  margin-top: 80px;
  gap: 60px 24px;

  ${mediaQuery('tablet1024', `margin-top: 72px;`)}
  ${mediaQuery('mobile', `margin-top: 32px; gap: 20px 24px;`)}
`;

const EmptyMember = styled.div`
  ${font('title22', 'regular')}
  ${lineHeight(22, 36)}
  color: ${props => props.theme.color.textBlackMedium};
  letter-spacing: -0.4px;
  margin-top: 146px;
  text-align: center;

  ${mediaQuery(
    'mobile',
    `
      ${font('mobile14', 'regular')};
      margin-top: 100px;
    `,
  )}
`;

export { MemberList, EmptyMember };

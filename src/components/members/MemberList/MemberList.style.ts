import { flex, font, lineHeight } from '@Styles/mixin.style';
import styled from 'styled-components';

const MemberList = styled.ul`
  ${flex('space-around')}
  flex-wrap: wrap;
  margin-top: 80px;
  gap: 24px;
`;

const EmptyMember = styled.div`
  ${font('title22', 'regular')}
  ${lineHeight(22, 36)}
  color: ${props => props.theme.color.textBlackMedium};
  letter: -0.4px;
  margin-top: 146px;
  text-align: center;
`;

export { MemberList, EmptyMember };

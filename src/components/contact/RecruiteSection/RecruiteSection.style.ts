import { font } from '@Styles/mixin.style';
import styled from 'styled-components';

const RecruiteSectionWrapper = styled.div`
  margin-top: 80px;
`;

const Description = styled.div`
  ${font('list20', 'regular')}
  line-height: 34px;
  white-space: break-spaces;
  margin: 20px 0 60px;
`;

export { RecruiteSectionWrapper, Description };

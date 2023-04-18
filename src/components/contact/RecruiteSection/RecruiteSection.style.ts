import { font, mediaQuery } from '@Styles/mixin.style';
import styled from 'styled-components';

const RecruiteSectionWrapper = styled.div`
  width: 1200px;
  margin: 0 auto;
  margin-top: 78px;

  ${mediaQuery('tablet1024', `width: 944px;`)}
`;

const Description = styled.div`
  ${font('list20', 'regular')}
  line-height: 34px;
  white-space: break-spaces;
  margin: 20px 0 60px;
`;

export { RecruiteSectionWrapper, Description };

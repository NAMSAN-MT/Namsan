import { font, lineHeight, mediaQuery } from '@Styles/mixin.style';
import styled from 'styled-components';

const RecruiteSectionWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-top: 78px;

  ${mediaQuery('tablet1024', `margin-top: 49px;`)};
`;

const Description = styled.div`
  ${font('list20', 'regular')}
  line-height: 34px;
  white-space: break-spaces;
  margin: 20px 0 60px;

  ${mediaQuery(
    'tablet1024',
    `
    ${font('mobile14', 'regular')};
    ${lineHeight(14, 24)};
    margin: 7px 0 40px;
  `,
  )}
`;

export { RecruiteSectionWrapper, Description };

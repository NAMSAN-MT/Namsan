import { font, lineHeight } from '@Styles/mixin.style';
import styled from 'styled-components';

const IntroduceItemWrapper = styled.div`
  margin: 40px 0;

  .title {
    ${font('title26', 'bold')};
    ${lineHeight(26, 40)};
    letter-spacing: -0.4px;
    color: ${props => props.theme.color.textBlackHigh};
    margin-bottom: 16px;
  }

  .info {
    ${font('list20', 'regular')};
    ${lineHeight(20, 44)};
    letter-spacing: -0.4px;
    color: ${props => props.theme.color.textBlackHigh};

    li {
      display: flex;

      .time {
        min-width: 140px;
      }
    }
  }
`;

export { IntroduceItemWrapper };

import { flex, font, lineHeight, mediaQuery, size } from '@Styles/mixin.style';
import styled from 'styled-components';
import MoreIcon from '@Images/ic_+_hover.svg';
import LessIcon from '@Images/ic_-_hover.svg';

const IntroduceItemWrapper = styled.div`
  margin: 40px 0;

  ${mediaQuery('mobile', `margin: 32.5px 0;`)};

  .title {
    ${font('title26', 'bold')};
    ${lineHeight(26, 40)};
    letter-spacing: -0.4px;
    color: ${props => props.theme.color.textBlackHigh};
    margin-bottom: 16px;

    ${mediaQuery(
      'mobile',
      `
      ${font('mobile18', 'bold')};
      ${lineHeight(18, 26)};
      letter-spacing: -0.2px;
      margin-bottom: 12px;`,
    )};
  }

  .info {
    ${font('list20', 'regular')};
    ${lineHeight(20, 44)};
    letter-spacing: -0.4px;
    color: ${props => props.theme.color.textBlackHigh};

    ${mediaQuery(
      'mobile',
      `
    ${font('mobile_list14', 'regular')};
    ${lineHeight(14, 32)};
    letter-spacing: 0;`,
    )}

    li {
      display: flex;
      ${mediaQuery(
        'mobile',
        `
      flex-direction: column;
      margin-bottom: 12px`,
      )};

      .time {
        color: ${props => props.theme.color.textBlackMedium};
        min-width: 120px;
      }
    }
  }
`;

const ShowMoreButton = styled.div<{ isFullData: boolean }>`
  border: 1.5px solid ${props => props.theme.color.grey600};
  border-radius: 35px;
  padding: 10px 20px;
  margin-top: 24px;
  cursor: pointer;
  ${size('100%', 'fit-content')};
  ${font('body16', 'bold')};
  ${lineHeight(16, 26)};
  letter-spacing: -0.2px;
  ${flex('center', 'center')};

  ${mediaQuery(
    'mobile',
    `
    ${font('caption12', 'bold')};
    ${lineHeight(12, 20)};
    letter-spacing: -0.1px;
    padding: 8px 19.5px;`,
  )};

  ::before {
    content: '';
    display: inline-block;
    background: url(${({ isFullData }) => (isFullData ? LessIcon : MoreIcon)})
      no-repeat center center;
    margin-right: 5px;
    ${size('14px', '14px')};

    ${mediaQuery(
      'mobile',
      `
    ${size('12.25px', '12.25px')};
    margin-right: 2.87px;`,
    )};
  }
`;

export { IntroduceItemWrapper, ShowMoreButton };

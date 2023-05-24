import { font, lineHeight, flex, mediaQuery, size } from '@Styles/mixin.style';
import styled from 'styled-components';
import MoreIcon from '@Images/ic_+_hover.svg';
import LessIcon from '@Images/ic_-_hover.svg';

const ShowMoreButton = styled.div<{ isFullData: boolean }>`
  border: 1.5px solid ${props => props.theme.color.grey600};
  border-radius: 35px;
  padding: 10px 24px 10px 25px;
  margin-top: 32px;
  cursor: pointer;
  height: 46px;
  ${size('100%', 'fit-content')};
  ${font('body16', 'bold')};
  ${lineHeight(16, 26)};
  letter-spacing: -0.2px;
  ${flex('center', 'center')};
  color: ${({ theme }) => theme.color.grey700};

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

export { ShowMoreButton };

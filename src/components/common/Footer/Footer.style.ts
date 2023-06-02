import { flex, font, lineHeight, mediaQuery } from '@Styles/mixin.style';
import { Link } from 'gatsby';
import styled from 'styled-components';

const FooterWrapper = styled.div`
  ${flex()};
  flex-direction: column;
  width: 100%;
  padding: 0 90px;
  height: 224px;
  background-color: ${({ theme }) => theme.color.textWhiteHigh};
  border-top: 1px solid ${({ theme }) => theme.color.grey200};
  ${mediaQuery(
    'mobile',
    `
      height: 226px;
      padding: 0 24px;
    `,
  )};
`;

const FirstSection = styled.div`
  ${flex('space-between')};
  width: 100%;
  ${mediaQuery(
    'mobile',
    `
      ${flex('start', 'start')};
      flex-direction: column;
    `,
  )};
`;

const LogoWrapper = styled.div`
  width: 110px;
  ${mediaQuery(
    'mobile',
    `
      width: 89px;
      margin-bottom: 25px;
    `,
  )};
`;

const TermAndConditionLink = styled(Link)`
  text-align: center;
  letter-spacing: -0.2px;
  color: ${({ theme }) => theme.color.grey500};

  ${font('body16', 'medium')};
  ${lineHeight(16, 26)};
  ${mediaQuery(
    'mobile',
    `
      ${font('caption12', 'bold')};
      ${lineHeight(12, 18)};
      letter-spacing: -0.1px;
    `,
  )};

  .divider {
    padding: 0 16px;
    width: 1px;
    ${font('body16', 'bold')};
    color: ${({ theme }) => theme.color.grey200};
    ${mediaQuery(
      'mobile',
      `
      ${font('caption12', 'bold')};
       padding: 0 8px;
    `,
    )};
  }
`;

const SecondSection = styled.div`
  width: 100%;
  padding-top: 24px;
  ${mediaQuery(
    'mobile',
    `
       padding-top: 12px;
    `,
  )};
  span {
    letter-spacing: -0.1px;
    color: ${({ theme }) => theme.color.grey500};
    margin-right: 10px;

    ${font('body14', 'regular')};
    ${lineHeight(14, 22)};
    ${mediaQuery(
      'mobile',
      `
      ${font('caption12', 'regular')};
      ${lineHeight(12, 20)};
       display: block;
      `,
    )};
    &.fax {
      display: inline;
    }
  }
`;

export {
  FooterWrapper,
  FirstSection,
  LogoWrapper,
  SecondSection,
  TermAndConditionLink,
};

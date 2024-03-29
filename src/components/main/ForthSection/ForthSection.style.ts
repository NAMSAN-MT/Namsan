import {
  ellipsis,
  flex,
  font,
  lineHeight,
  mediaQuery,
  size,
} from '@Styles/mixin.style';
import styled from 'styled-components';
import { Wrapper } from '../FirstSection/FirstSection.style';
//
const ForthWrapper = styled(Wrapper)`
  background-color: ${({ theme }) => theme.color.textWhiteHigh};
  margin-top: 140px;
  ${mediaQuery(
    'tablet1024',
    `
      margin-top: 102px;
    `,
  )};
  ${mediaQuery(
    'mobile',
    `
      margin-top: 61px;
    `,
  )};
`;

const InnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  ${mediaQuery(
    'mobile',
    `
     padding: 0 24px;
    `,
  )};
`;

const TopWrapper = styled.div`
  width: 100%;
  ${flex('space-between', 'center')};
`;

const BottomWrapper = styled.div`
  ${flex()};
  margin-top: 36px;
  gap: 24px;
  .card-box {
    margin: 0;
    ${mediaQuery(
      'mobile',
      `
      gap: 16px;
    `,
    )};
  }

  ${mediaQuery(
    'tablet1024',
    `
    margin-top: 34px;
      flex-direction: column;
      width: 100%;
    `,
  )};

  ${mediaQuery(
    'mobile',
    `
      flex-direction: column;
      margin-top: 19px;
      gap: 16px;

      .card-title {
        height: unset !important;
      }

      .card-content {
        height: unset !important;
        min-height: 44px;
      }
    `,
  )};

  .card-wrapper {
    width: 100%;
    padding: 0;

    ${mediaQuery(
      'tablet1024',
      `
      width: 100%;
      max-width: 100%;
      max-height: 300px;
      padding: 40px 32px;
      height: unset;
    `,
    )};

    ${mediaQuery(
      'mobile',
      `
      width: 100%;
      max-width: 100%;
      height: 100%;
      padding: 24px 20px;
      ${size('188px', '100%')}
    `,
    )};

    .card-label {
      padding: 52px 40px 0 40px;
      ${mediaQuery(
        'tablet1024',
        `
          margin-bottom: 12px;
          padding: 0
        `,
      )};
      p {
        ${mediaQuery(
          'tablet1024',
          `
          ${font('body16', 'bold')};
          ${lineHeight(16, 26)};
          ${ellipsis()};
        `,
        )};
        ${mediaQuery(
          'mobile',
          `
          ${font('mobile12', 'bold')};
          ${lineHeight(12, 20)};
          ${ellipsis()};
          letter-spacing: -0.1px;
          padding: 2px 8px;
        `,
        )};
      }
    }
    .card-title {
      padding: 0 40px;
      ${mediaQuery(
        'tablet1024',
        `
        max-width: 100%;
        margin-top: 0;
        margin-bottom: 12px;
        height: unset;
        ${font('title24', 'regular')};
        ${lineHeight(24, 38)};
        ${ellipsis()};
        display: inline-block;
        padding: 0
      `,
      )};
      ${mediaQuery(
        'mobile',
        `
        margin-bottom: 0px;
        height: 100%;
        ${font('mobile16', 'bold')};
        ${lineHeight(16, 26)};
        ${ellipsis()};
        display: inline-block;
        padding: 0
      `,
      )};
    }
    .card-content {
      padding: 0 40px;
      ${mediaQuery(
        'tablet1024',
        `
        margin-bottom: 40px;
        ${font('title18', 'regular')};
        ${lineHeight(18, 28)};
        color: rgba(6, 11, 17, 0.56);
         padding: 0
      `,
      )};
      ${mediaQuery(
        'mobile',
        `
        margin-bottom: 16px;
        height: 100%;
        ${font('mobile14', 'regular')};
        ${lineHeight(14, 22)};
        color: rgba(6, 11, 17, 0.56);
        padding: 0
      `,
      )};
    }
    .card-date {
      padding: 0 40px;
      ${mediaQuery(
        'tablet1024',
        `
         margin-bottom: 0;
        padding: 0
      `,
      )};
      ${mediaQuery(
        'mobile',
        `
        padding: 0
      `,
      )};
      p {
        ${mediaQuery(
          'tablet1024',
          `
          height: unset;
          ${font('title18', 'regular')};
          ${lineHeight(18, 28)};
          letter-spacing: -0.2px;
        `,
        )};
        ${mediaQuery(
          'mobile',
          `
        height: 100%;
        ${font('caption12', 'demilight')};
        ${lineHeight(12, 20)};
         letter-spacing: -0.1px;
      `,
        )};
      }
      .divider {
        ${mediaQuery(
          'tablet1024',
          `
          width: 100%;
        `,
        )};
        ${mediaQuery(
          'mobile',
          `
          width: 100%;
        `,
        )};
      }
    }
  }
`;

const ButtonWrapper = styled.div`
  ${mediaQuery(
    'mobile',
    `
        margin-top: 22px;
      `,
  )};
`;

const Title = styled.div`
  letter-spacing: -0.6px;
  color: ${({ theme }) => theme.color.textBlackHigh};

  ${font('display42', 'bold')};
  ${lineHeight(42, 60)};
  ${mediaQuery(
    'mobile',
    `
        ${font('mobile24', 'bold')};
        ${lineHeight(24, 36)};
        letter-spacing: -0.4px;
      `,
  )};
`;

export {
  TopWrapper,
  InnerWrapper,
  ForthWrapper,
  BottomWrapper,
  ButtonWrapper,
  Title,
};

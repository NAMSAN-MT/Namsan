import styled from 'styled-components';
import { font, lineHeight, mediaQuery, size } from '@Styles/mixin.style';

const MemberWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageWrapper = styled.div`
  position: relative;
  ${size('460px')};
  max-width: 1200px;

  margin: 0 auto;

  ${mediaQuery(
    'tablet1024',
    `margin: 0 auto;
  height: 423.6px;`,
  )}
  ${mediaQuery('mobile', `${size('360px')};`)};

  .bg {
    ${size('100%', '100%')};

    & > div {
      height: 100%;
    }
  }

  .profile {
    ${size('auto', '406px')};
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 0;

    ${mediaQuery('tablet1024', `${size(undefined, '325px')}`)}
    ${mediaQuery(
      'mobile',
      `${size('100%', '268px')};
    display: flex;`,
    )}
  }
`;

const TextWrapper = styled.div`
  background-color: ${props => props.theme.color.white};
  padding: 68px 102px calc(160px - 85px);
  margin: 0 auto;
  max-width: 996px;
  transform: translateY(-51px);

  ${mediaQuery(
    'tablet1024',
    `
    padding: 68px 40px calc(160px - 85px);
    margin: 0 40px;
  `,
  )}

  ${mediaQuery(
    'mobile',
    `
  padding: 28px 24px;
  transform: none;
  margin: 0;
  `,
  )}

  .name {
    ${font('display36', 'bold')};
    ${lineHeight(36, 54)};
    letter-spacing: -0.4px;

    ${mediaQuery(
      'mobile',
      `${font('mobile20', 'bold')}; ${lineHeight(20, 30)};letter-spacing:0;`,
    )}
  }

  .position {
    ${font('title20', 'bold')};
    ${lineHeight(20, 34)};
    margin-bottom: 8px;

    ${mediaQuery(
      'mobile',
      `${font('mobile16', 'bold')};${lineHeight(
        16,
        26,
      )};letter-spacing:0;margin-bottom: 0;}`,
    )};

    .email {
      ${font('body16', 'regular')};
      ${lineHeight(16, 26)};
      letter-spacing: -0.2px;
      color: ${props => props.theme.color.textBlackMedium};
      margin-bottom: 24px;

      ${mediaQuery(
        'mobile',
        `${font('mobile14', 'regular')};
        ${lineHeight(14, 22)};
        letter-spacing:0;
        margin-bottom: 12px;`,
      )};
    }

    .description {
      ${font('title20', 'regular')};
      ${lineHeight(20, 34)};
      margin: 32px 0 40px;
      white-space: pre-wrap;

      ${mediaQuery(
        'mobile',
        `${font('mobile16', 'regular')};
        ${lineHeight(16, 26)};
        letter-spacing:0;
        margin: 24px 0 32px;`,
      )};
    }
  }
`;

const TagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px 8px;

  ${mediaQuery('mobile', `gap: 6px;`)};

  .tag {
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 2px;
    display: inline-block;
    border: 1px solid ${props => props.theme.color.blue100};
    ${font('body14', 'bold')};
    ${lineHeight(14, 22)};
    letter-spacing: -0.1px;
    color: ${props => props.theme.color.blue100};
    height: 30px;

    ${mediaQuery(
      'mobile',
      `
    ${font('mobile12', 'bold')};
    // ${lineHeight(12, 18)};
    line-height: 1.78;
    letter-spacing: -0.1px;`,
    )};
  }
`;

export { MemberWrapper, ImageWrapper, TextWrapper, TagWrapper };

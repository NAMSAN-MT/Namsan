import styled from 'styled-components';
import MemberBackgroundImage from '@Images/member_bg.jpg';
import { font, lineHeight, mediaQuery, size } from '@Styles/mixin.style';

const MemberWrapper = styled.div`
  position: relative;
`;

const ImageWrapper = styled.div<{ src: string }>`
  position: relative;
  ${size('460px')}
  max-width: 1200px;

  background: url('${props => props.src}');
  background-size: cover;
  margin: 0 auto;

  ${mediaQuery('mobile', `${size('360px')};`)}
`;

const ProfileImage = styled.img`
  ${size('auto', '406px')};
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;

  ${mediaQuery('mobile', `${size(undefined, '215px')}`)}
`;

const TextWrapper = styled.div`
  background-color: ${props => props.theme.color.white};
  padding: 68px 102px;
  margin: 0 auto;
  max-width: 996px;
  transform: translateY(-85px);

  ${mediaQuery(
    'mobile',
    `
  padding: 28px 24px;
  transform: none;
  `,
  )}

  .name {
    ${font('display36', 'bold')};
    ${lineHeight(36, 60)};
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
      `${font('mobile16', 'bold')};${lineHeight(16, 26)};letter-spacing:0;}`,
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
        margin-bottom: 20px;`,
      )};
    }

    .description {
      ${font('title20', 'regular')};
      ${lineHeight(20, 34)};
      margin: 32px 0;
      white-space: pre-wrap;

      ${mediaQuery(
        'mobile',
        `${font('mobile16', 'regular')};
        ${lineHeight(16, 26)};
        letter-spacing:0;
        margin: 24px 0;`,
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
    ${lineHeight(12, 18)};
    letter-spacing: -0.1px;`,
    )};
  }
`;

export { MemberWrapper, ImageWrapper, ProfileImage, TextWrapper, TagWrapper };

import { theme } from './../../../styles/varialbes.style';
import {
  ellipsis,
  ellipsisMulti,
  flex,
  flexDirection,
  font,
  lineHeight,
  mediaQuery,
  size,
} from '@Styles/mixin.style';
import { ScreenBreakPoints } from '@Styles/varialbes.style';
import { NewsType } from '@Type/api.type';
import styled from 'styled-components';

export const Wrapper = styled.div`
  ${flexDirection('column')}
  width: 100%;
`;

export const HeaderContainer = styled.div`
  ${flex()}
  ${flexDirection('column')}
  width: 100%;
`;
export const TopText = styled.p<{ newsType: NewsType }>`
  ${font('title18', 'medium')}
  ${lineHeight(18, 28)}
  text-align: center;
  letter-spacing: -0.2px;
  color: ${({ newsType, theme }) =>
    newsType === 'media' ? theme.color.blue200 : theme.color.red500};

  ${mediaQuery('mobile', `${font('mobile14', 'bold')} ${lineHeight(14, 22)}`)};
`;

export const HeaderDivder = styled.div`
  ${size('1px', '80px')}
  background: ${({ theme }) => theme.color.dividerGrey200};
  ${mediaQuery('mobile', `${size('1px', '60px')}`)};
`;

export const TitleArea = styled.div`
  padding: 12px 0px 24px 0px;
  ${flex('space-between')}
  ${flexDirection('row')}
  width: 100%;

  & > div {
    opacity: 0.56;

    ${mediaQuery('tablet1024', `display:none;`)};
    ${mediaQuery('mobile', `display:none;`)};
  }

  & > button {
    ${mediaQuery('tablet1024', `display:none;`)};
    ${mediaQuery('mobile', `display:none;`)};
  }

  & > h1 {
    ${flex()}
    text-align: center;
    font-family: 'Noto Sans';
    font-style: normal;
    ${font('title32', 'bold')}
    ${lineHeight(32, 48)}
    letter-spacing: -0.4px;
    color: ${({ theme }) => theme.color.black};

    ${ellipsisMulti(2)}

    ${mediaQuery(
      'mobile',
      `
        justify-content: center;
        ${font('title24', 'bold')}
        ${lineHeight(24, 36)}
        letter-spacing: -0.4px;
      `,
    )};
  }

  ${mediaQuery('tablet1024', `justify-content: center;`)};
`;

export const DateARea = styled.p`
  padding: 16px 0px 60px;

  ${font('body16', 'regular')}
  ${lineHeight(16, 26)}
  text-align: center;
  letter-spacing: -0.2px;
  color: rgba(6, 11, 17, 0.56);

  ${mediaQuery('tablet1024', `padding: 16px 0px 40px;`)};
  ${mediaQuery(
    'mobile',
    `
      padding: 16px 0px 40px;
      ${font('mobile14', 'regular')}
      ${lineHeight(14, 22)}
    `,
  )};
`;

export const ContentConatiner = styled.div<{ isProfile: boolean }>`
  ${flexDirection('column')}
  ${size('auto', '100%')}
  max-width: 792px;

  .top {
    ${size('auto', '100%')}
    text-align: center;
    margin-bottom: 48px;

    ${mediaQuery('tablet1024', `${size('auto', '100%')}margin-bottom: 40px;`)};
  }

  .bottom {
    padding: ${({ isProfile }) => (isProfile ? '80px' : '60px')} 0px 80px;
    @media (max-width: ${ScreenBreakPoints['mobile']}) {
      padding: ${({ isProfile }) => (isProfile ? '52px' : '40px')} 0px 64px;
    }
  }

  img {
    width: 100%;
  }
`;

export const ProfileArea = styled.div`
  ${flex()}
  ${flexDirection()}
  ${size('200px', '132px')}

  img {
    background: ${props => props.theme.color.grey50};
    ${size('132px', '132px')}
    object-fit: scale-down;
    border-radius: 100%;

    ${mediaQuery('mobile', `${size('100px', '88px')}`)}
  }

  ${mediaQuery('mobile', `${size('152px', '100px')}`)}
`;

export const TextSection = styled.div`
  ${flex()}
  ${flexDirection()}
  white-space : nowrap;
`;

export const Name = styled.div`
  ${font('title20', 'bold')}
  ${lineHeight(20, 34)}
  color: ${props => props.theme.color.textBlackHigh};
  letter-spacing: -0.4px;
  margin-top: 8px;

  ${mediaQuery(
    'mobile',
    `
      margin-top: 12px;
      ${font('mobile14', 'bold')};
      ${lineHeight(14, 22)}
      letter-spacing: -0.1px;
    `,
  )}
`;

export const Position = styled.div`
  ${font('body16', 'regular')};
  ${lineHeight(16, 26)};
  letter-spacing: -0.2px;

  color: ${props => props.theme.color.textBlackMedium};

  ${mediaQuery(
    'mobile',
    `
      ${font('mobile12', 'regular')};
      ${lineHeight(12, 18)}
      letter-spacing: -0.1px;
    `,
  )}
`;

export const Content = styled.pre`
  ${mediaQuery(
    'mobile',
    `
    ${font('mobile16', 'regular')}
    ${lineHeight(16, 26)}
    `,
  )};

  ${size('auto', '100%')}

  white-space: pre-line;
  ${font('title20', 'regular')}
  ${lineHeight(20, 34)}
  ${({ theme }) => theme.color.black}
`;

export const BottomConatiner = styled.div<{
  isPrevContent: boolean;
  isNextContent: boolean;
}>`
  ${flex('center', 'end')}
  ${size('100%', '100%')}
  padding-top: 75px;

  border-top: 1px solid ${({ theme }) => theme.color.dividerGrey200};

  .action__area {
    width: 100%;
    ${flexDirection('row')}
    justify-content: space-around;

    ${mediaQuery(
      'tablet1024',
      `
        ${flexDirection('column')} 
        align-items: start;
        row-gap:20px;
      `,
    )};
    ${mediaQuery(
      'mobile',
      `
        ${flexDirection('column')} 
        align-items: start; 
        row-gap:16px;
      `,
    )};
  }

  .prev,
  .next {
    width: 100%;
    ${flexDirection('row')}
    gap: 12px;

    .btn_title {
      max-width: 326px;
      ${mediaQuery('tablet1024', `max-width: 100%;`)};

      ${ellipsisMulti(1)}
    }

    & p {
      padding-top: 3px;

      ${font('body16', 'regular')}
      ${lineHeight(16, 26)}
      letter-spacing: -0.2px;
      color: ${({ theme }) => theme.color.black};

      ${mediaQuery(
        'mobile',
        `
          ${font('body14', 'regular')}
          ${lineHeight(14, 22)}
          letter-spacing: -0.1px;
        `,
      )};
    }

    & > button {
      ${size('26px', 'auto')}
      ${flexDirection('row')}
      
      & > p {
        ${font('body16', 'bold')}
        ${lineHeight(16, 26)}
        letter-spacing: -0.2px;
        color: ${({ theme }) => theme.color.textBlue};

        ${mediaQuery(
          'mobile',
          `
            ${size('22px', '39px')}
            ${font('body14', 'bold')}
            ${lineHeight(14, 22)}
            letter-spacing: -0.1px;
        `,
        )};
      }

      & > div {
        ${mediaQuery('tablet1024', ` display:none;`)};
        ${mediaQuery('mobile', ` display:none;`)};
      }
    }

    ${mediaQuery('tablet1024', `gap: 8px;`)};
    ${mediaQuery('mobile', `gap: 8px;`)};
  }

  .prev {
    justify-content: flex-start;
    /* ${mediaQuery('tablet1024', `margin: 0px 0px 16px;`)}
    ${mediaQuery('mobile', `margin: 0px 0px 16px;`)} */
  }

  .next {
    justify-content: flex-end;

    ${mediaQuery('tablet1024', `flex-direction: row-reverse;`)};
    ${mediaQuery('mobile', `flex-direction: row-reverse;`)};
  }

  ${mediaQuery('tablet1024', `${size('100%', '100%')} padding-top: 40px;`)};
  ${mediaQuery('mobile', `${size('100%', '100%')} padding-top: 24px;`)};
`;

export const ListIconWrapper = styled.div`
  ${mediaQuery('tablet1024', `display:none;`)};
  ${mediaQuery('mobile', `display:none;`)};
`;

export const FloatingWrapper = styled.div<{
  pc?: { bottomHeight?: '284px' | '356px' };
  tablet?: { bottomHeight?: '276px' | '356px' };
}>`
  width: 100%;
  ${flex('flex-end', 'center')}
  flex-direction: 'column;';
  position: fixed;
  right: 90;
  bottom: 284;

  ${mediaQuery('tablet1024', `right: 40px;bottom: 276px;`)};
  ${mediaQuery('mobile', `right: 24px;bottom: 266px;`)};
`;

export const EmptyArrow = styled.div`
  ${size('60px', '60px')}
`;

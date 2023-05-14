import {
  flex,
  flexDirection,
  font,
  lineHeight,
  mediaQuery,
  size,
} from '@Styles/mixin.style';
import { NewsType } from '@Type/api.type';
import styled from 'styled-components';

export const Wrapper = styled.div`
  ${flexDirection('column')}
  width: 996px;
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
`;

export const HeaderDivder = styled.div`
  ${size('1px', '80px')}
  background: ${({ theme }) => theme.color.dividerGrey200};
`;

export const TitleArea = styled.div`
  padding: 12px 0px 24px 0px;
  ${flex('space-between')}
  ${flexDirection('row')}
  width: 100%;

  & > div {
    opacity: 0.56;
  }

  & > h1 {
    ${flex()}
    font-family: 'Noto Sans';
    font-style: normal;
    ${font('title32', 'bold')}
    ${lineHeight(32, 48)}
    letter-spacing: -0.4px;
    color: ${({ theme }) => theme.color.black};
  }
`;

export const DateARea = styled.p`
  padding: 16px 0px 60px;

  ${font('body16', 'regular')}
  ${lineHeight(16, 26)}
  text-align: center;
  letter-spacing: -0.2px;
  color: rgba(6, 11, 17, 0.56);
`;

export const ContentConatiner = styled.div`
  ${flexDirection('column')}
  ${size('auto', '792px')}

  .top {
    ${size('auto', '792px')}
    text-align: center;
    margin-bottom: 48px;
  }

  .bottom {
    padding: 80px 0px;
  }
`;

export const Content = styled.pre`
  ${size('auto', '100%')}

  white-space: pre-line;
  ${font('title20', 'regular')}
  ${lineHeight(20, 34)}
  ${({ theme }) => theme.color.black}
`;

export const BottomConatiner = styled.div`
  ${flex('center', 'end')}
  ${size('117px', '100%')}
  border-top: 1px solid ${({ theme }) => theme.color.dividerGrey200};

  .action__area {
    width: 100%;
    ${flexDirection('row')}
    justify-content: space-around;
  }

  .prev,
  .next {
    ${flexDirection('row')}
    gap: 12px;
    & p {
      padding-top: 3px;

      ${font('body16', 'regular')}
      ${lineHeight(16, 26)}
      letter-spacing: -0.2px;
      color: ${({ theme }) => theme.color.black};
    }

    & > button {
      ${size('26px', '72px')}
      ${flexDirection('row')}
      
      & > p {
        ${font('body16', 'bold')}
        ${lineHeight(16, 26)}
        letter-spacing: -0.2px;
        color: ${({ theme }) => theme.color.textBlue};
      }
    }
  }
`;

export const ListIconWrapper = styled.div`
  /* width: 100%;
  ${flex('flex-end', 'center ')}; */
`;

export const FloatingWrapper = styled.div<{
  pc?: { bottomHeight?: '284px' | '356px' };
  tablet?: { bottomHeight?: '276px' | '356px' };
}>`
  width: 100%;
  ${flex('flex-end', 'center ')};
  flex-direction: 'column;';
  position: fixed;
  right: 90;
  bottom: 284;

  ${mediaQuery(
    'tablet1024',
    `
     right: 40px;
     bottom: 276px;
    `,
  )};
  ${mediaQuery(
    'mobile',
    `
     right: 24px;
     bottom: 266px;
    `,
  )};
`;

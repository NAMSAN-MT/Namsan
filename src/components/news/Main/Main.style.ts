import SearchIcon from '@Images/ic_search.svg';
import {
  ellipsisMulti,
  flex,
  flexDirection,
  font,
  mediaQuery,
  size,
} from '@Styles/mixin.style';
import { ScreenBreakPoints } from '@Styles/varialbes.style';
import styled from 'styled-components';
import { NewsType } from '../../../type/api.type';

export const TabSearchBox = styled.div`
  ${flex('space-between', 'center')}

  margin: 60px 0px;
  padding: 8px 0px;

  ${mediaQuery(
    'mobile',
    `
      ${flexDirection('column')}
      ${flex('', 'flex-start')}
    `,
  )}
`;

export const TabBox = styled.ul`
  list-style-type: none;
  ${flex()}
`;

export const Tab = styled.li<{ isActive: boolean }>`
  ${flex()}
  min-width: 81px;
  padding: 6px 20px;
  letter-spacing: -0.4px;

  font-family: 'Noto Sans CJK KR';
  font-style: normal;
  font-weight: 700;
  ${font('title22', 'bold')}

  background: ${({ isActive, theme }) =>
    isActive ? `${theme.color.grey100}; border-radius: 50px` : ''};

  a {
    color: ${({ isActive, theme }) =>
      isActive ? theme.color.black : 'rgba(6, 11, 17, 0.3)'};
    text-decoration: none;

    @media (max-width: ${ScreenBreakPoints['mobile']}) {
      color: ${({ isActive, theme }) =>
        isActive ? theme.color.blue200 : 'rgba(6, 11, 17, 0.3)'};
    }
  }

  ${mediaQuery(
    'mobile',
    `
      ${flex('flex-start')}
      padding: 6px 0px;
      min-width: 26px;
      margin-right: 16px;

      ${font('body16', 'bold')}
      background: #fff;
  `,
  )}
`;

export const SearchBox = styled.div`
  ${size('64px', '384px')}
  ${flex('end')}
  min-width: 100px;

  border-bottom: 2px solid ${({ theme }) => theme.color.grey200};

  input {
    width: 100%;
    padding-left: 12px;
    border: none;

    font-family: 'Noto Sans CJK KR';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    ${font('title18', 'regular')}

    line-height: 28px;
    letter-spacing: -0.2px;

    ::placeholder {
      color: rgba(6, 11, 17, 0.3);
    }

    :-ms-input-placeholder {
      color: rgba(6, 11, 17, 0.3);
    }

    ::-ms-input-placeholder {
      color: rgba(6, 11, 17, 0.3);
    }
  }

  ::after {
    content: '';
    display: inline-block;
    background: ${`url(${SearchIcon}) no-repeat center center`};
    margin-right: 5px;
    ${size('24px', '24px')}
  }
`;

export const CardBox = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

  margin-bottom: 80px;
`;

export const Card = styled.a`
  ${size('464px')}
  max-width: 384px;

  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.color.grey200};
  border-radius: 10px;

  padding: 52px 40px 40px 40px;

  :hover {
    background: #f1f7fd;
  }
`;

export const LabelBox = styled.div<{ type: NewsType }>`
  ${flex('', 'center')}
  letter-spacing: -0.2px;
  margin-bottom: 16px;

  p {
    background: ${({ type }) => (type === 'recent' ? '#811B14' : '#1e59b3')};
    border-radius: 4px;
    padding: 6px 10px 4px 10px;

    font-family: 'Noto Sans CJK KR';
    font-style: normal;
    ${font('body16', 'bold')}
    line-height: 26px;

    color: ${({ theme }) => theme.color.white};
  }
`;

export const Title = styled.p`
  height: 76px;
  margin-bottom: 24px;

  ${ellipsisMulti(2)}

  font-family: 'Noto Sans CJK KR';
  font-style: normal;
  ${font('title24', 'regular')}
  line-height: 38px;
  letter-spacing: -0.4px;

  color: ${({ theme }) => theme.color.black};
`;

export const Content = styled.p`
  height: 84px;
  margin-bottom: 110px;

  ${ellipsisMulti(3)}

  font-family: 'Noto Sans CJK KR';
  font-style: normal;
  ${font('title18_2', 'regular')}
  line-height: 28px;
  letter-spacing: -0.2px;

  color: rgba(6, 11, 17, 0.56);
`;

export const Date = styled.div`
  ${flexDirection('row')}
  gap: 20px;

  p {
    font-family: 'Noto Sans CJK KR';
    font-style: normal;
    ${font('title18_2', 'regular')}
    line-height: 28px;

    ${flex('')}
    letter-spacing: -0.2px;

    color: rgba(6, 11, 17, 0.3);
  }

  .divider {
    ${size('1px', '221px')}
    background: ${({ theme }) => theme.color.grey200};
  }
`;

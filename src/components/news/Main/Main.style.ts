import { theme } from './../../../styles/varialbes.style';
import { flex, font, size } from '@Styles/mixin.style';
import styled from 'styled-components';
import SearchIcon from '@Images/ic_search.svg';

export const TabSearchBox = styled.div`
  ${flex('space-between', 'center')}

  margin: 60px 0px;
  padding: 8px 0px;
`;

export const TabBox = styled.ul`
  list-style-type: none;
  ${flex()}
`;

export const Tab = styled.li<{ isActive?: boolean }>`
  ${flex()}
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
  }
`;

export const SearchBox = styled.div`
  ${size('64px', '384px')}
  ${flex('end')}

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
    margin-right: 20px;
    ${size('24px', '24px')}
  }
`;

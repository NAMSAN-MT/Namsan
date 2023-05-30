import { flex, lineHeight, size } from '@Styles/mixin.style';
import styled from 'styled-components';
import { mediaQuery } from '../../../styles/mixin.style';
import m_searchIcon from '@Images/ic_search_m.svg';

const SearchBarWrapper = styled.div`
  ${flex('flex-start')};
  gap: 24px;

  ${mediaQuery('pc1278', `flex-wrap: wrap;`)}
  ${mediaQuery(
    'mobile',
    `
  flex-direction: column;
  gap: 9px`,
  )}

  button[type="submit"] {
    ${mediaQuery(
      'mobile',
      `
    right: 13px;`,
    )}
  }
`;

const ItemWrapper = styled.div<{ width: string }>`
  ${props => size('60px', props.width)}
  button {
    right: 16px;
    bottom: 3px;
  }

  ${mediaQuery(
    'mobile',
    `
      ${size('50px', '100%')};
      input {
        padding: 12px 0px 13px;
        ${lineHeight(16, 26)}
      }
      button {
        right: 0px;
        // top: 10px;
        
      }
  `,
  )}
`;

export { SearchBarWrapper, ItemWrapper };

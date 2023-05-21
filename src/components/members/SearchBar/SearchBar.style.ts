import { flex, size } from '@Styles/mixin.style';
import styled from 'styled-components';
import { mediaQuery } from '../../../styles/mixin.style';

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
`;

const ItemWrapper = styled.div<{ width: string }>`
  ${props => size('60px', props.width)}
  ${mediaQuery(
    'mobile',
    `
    ${size('51px', '100%')};
  `,
  )}
`;

export { SearchBarWrapper, ItemWrapper };

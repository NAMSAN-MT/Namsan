import { flex, size } from '@Styles/mixin.style';
import styled from 'styled-components';

const SearchBarWrapper = styled.div`
  ${flex('space-between')}
`;

const ItemWrapper = styled.div<{ width: string }>`
  ${props => size('60px', props.width)}
`;

export { SearchBarWrapper, ItemWrapper };

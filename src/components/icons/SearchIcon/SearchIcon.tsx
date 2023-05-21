import React from 'react';
import IconWrapper from '../IconWrapper';
import searchIcon from '@Images/ic_search.svg';
import searchIcon_m from '@Images/ic_search_m.svg';
import styled from 'styled-components';
import { mediaQuery, size } from '@Styles/mixin.style';
import { useLocation } from '@reach/router';

interface PropTypes {
  width?: string;
  height?: string;
}

const SearchIcon = (props: PropTypes) => {
  const path = useLocation();
  const isSearchIconMobile = path.pathname.indexOf('/news') > -1;

  return (
    <IconWrapper width={props.width || '24px'} height={props.height || '24px'}>
      <Icon isSearchIconMobile={isSearchIconMobile} />
    </IconWrapper>
  );
};

export default SearchIcon;

export const Icon = styled.div<{ isSearchIconMobile: boolean }>`
  ${size('24px', '24px')}
  background-image: url(${searchIcon});

  ${({ isSearchIconMobile }) => {
    return isSearchIconMobile
      ? mediaQuery(
          'mobile',
          `background-image: url(${searchIcon_m}); ${size('20px', '20px')}`,
        )
      : null;
  }}
`;

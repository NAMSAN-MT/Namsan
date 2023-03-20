import React from 'react';
import IconWrapper from '../IconWrapper';
import searchIcon from '@Images/ic_search.svg';

interface PropTypes {
  width?: string;
  height?: string;
}

const SearchIcon = (props: PropTypes) => {
  return (
    <IconWrapper width={props.width || '24px'} height={props.height || '24px'}>
      <img src={searchIcon} alt="search_icon" />
    </IconWrapper>
  );
};

export default SearchIcon;

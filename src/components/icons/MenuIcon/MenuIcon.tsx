import React from 'react';
import IconWrapper from '../IconWrapper';
import menuIcon from '@Images/ic_menu_nor.svg';

interface PropTypes {
  width?: string;
  height?: string;
}

const MenuIcon = (props: PropTypes) => {
  return (
    <IconWrapper width={props.width || '24px'} height={props.height || '24px'}>
      <img src={menuIcon} alt="menu icon" />
    </IconWrapper>
  );
};

export default MenuIcon;

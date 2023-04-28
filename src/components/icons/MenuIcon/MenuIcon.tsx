import React from 'react';
import IconWrapper from '../IconWrapper';
import menuIcon from '@Images/ic_menu_nor.svg';
import menuMobileIcon from '@Images/ic_m_menu_nor.svg';

interface PropTypes {
  width?: string;
  height?: string;
  isMobile?: boolean;
}

const MenuIcon = (props: PropTypes) => {
  return (
    <IconWrapper width={props.width || '24px'} height={props.height || '24px'}>
      <img src={props.isMobile ? menuMobileIcon : menuIcon} alt="menu icon" />
    </IconWrapper>
  );
};

export default MenuIcon;

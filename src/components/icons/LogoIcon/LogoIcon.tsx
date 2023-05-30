import React from 'react';
import IconWrapper from '../IconWrapper';
import LogoGnbIcon from '@Images/logo-gnb.svg';
import LogoMobileGnbWhiteIcon from '@Images/logo-mobile-gnb-white.svg';
import LogoMobileGnbIcon from '@Images/logo-mobile-gnb.svg';

interface PropTypes {
  width?: string;
  height?: string;
  isMobile?: boolean;
  isTransparent?: boolean;
  isMobileMenuOpen?: boolean;
}

const LogoIcon = (props: PropTypes) => {
  let logoSrc = LogoGnbIcon;
  if (props.isMobile) {
    if (props.isTransparent) {
      logoSrc = LogoMobileGnbWhiteIcon;
      if (props.isMobileMenuOpen) {
        logoSrc = LogoMobileGnbIcon;
      }
    }
  }

  return (
    <IconWrapper width={props.width || '24px'} height={props.height || '24px'}>
      <img src={logoSrc} alt="menu icon" />
    </IconWrapper>
  );
};

export default LogoIcon;

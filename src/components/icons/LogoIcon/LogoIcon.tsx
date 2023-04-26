import React from 'react';
import IconWrapper from '../IconWrapper';
import LogoGnbIcon from '@Images/logo-gnb.svg';
import LogoMobileGnbIcon from '@Images/logo-mobile-gnb.svg';

interface PropTypes {
  width?: string;
  height?: string;
  isMobile?: boolean;
}

const LogoIcon = (props: PropTypes) => {
  return (
    <IconWrapper width={props.width || '24px'} height={props.height || '24px'}>
      <img
        src={props.isMobile ? LogoMobileGnbIcon : LogoGnbIcon}
        alt="menu icon"
      />
    </IconWrapper>
  );
};

export default LogoIcon;

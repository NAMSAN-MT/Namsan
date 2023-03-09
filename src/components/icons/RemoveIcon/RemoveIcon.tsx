import React from 'react';
import IconWrapper from '../IconWrapper';
import removeIcon from '@Images/ic_-_nor.svg';
import removeHoverIcon from '@Images/ic_-_hover.svg';

interface PropTypes {
  width?: string;
  height?: string;
  hover?: boolean;
}

const RemoveIcon = (props: PropTypes) => {
  const src = props.hover ? removeHoverIcon : removeIcon;
  return (
    <IconWrapper width={props.width || '24px'} height={props.height || '24px'}>
      <img src={src} alt="add icon" />
    </IconWrapper>
  );
};

export default RemoveIcon;

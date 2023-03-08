import React from 'react';
import IconWrapper from '../IconWrapper';
import addIcon from '@Images/ic_+_nor.svg';
import addHoverIcon from '@Images/ic_+_hover.svg';

interface PropTypes {
  width?: string;
  height?: string;
  hover?: boolean;
}

const AddIcon = (props: PropTypes) => {
  const src = props.hover ? addHoverIcon : addIcon;
  return (
    <IconWrapper width={props.width || '24px'} height={props.height || '24px'}>
      <img src={src} alt="add icon" />
    </IconWrapper>
  );
};

export default AddIcon;

import React from 'react';
import IconWrapper from '../IconWrapper';
import filledArrowUp from '@Images/ic_arrow_drop_up.svg';
import filledArrowDown from '@Images/ic_arrow_drop_down.svg';
import filledArrowLeft from '@Images/ic_arrow_drop_left.svg';
import filledArrowRight from '@Images/ic_arrow_drop_right.svg';

interface PropTypes {
  width?: string;
  height?: string;
  direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
}

const FilledArrowIcon = (props: PropTypes) => {
  let src, alt;

  switch (props.direction) {
    case 'UP':
      src = filledArrowUp;
      alt = 'filled arrow up icon';
      break;
    case 'DOWN':
      src = filledArrowDown;
      alt = 'filled arrow down icon';
      break;
    case 'LEFT':
      src = filledArrowLeft;
      alt = 'filled arrow left icon';
      break;
    case 'RIGHT':
      src = filledArrowRight;
      alt = 'filled arrow right icon';
      break;
  }
  return (
    <IconWrapper width={props.width || '24px'} height={props.height || '24px'}>
      <img src={src} alt={src} />
    </IconWrapper>
  );
};

export default FilledArrowIcon;

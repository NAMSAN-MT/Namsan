import React, { MouseEventHandler } from 'react';
import IconWrapper from '../IconWrapper';
import newListIcon from '@Images/btn_news_list_nor.svg';
import newListHoverIcon from '@Images/ic_menu_hover.svg';

interface PropTypes {
  width?: string;
  height?: string;
}

const NewsListIcon = (props: PropTypes) => {
  return (
    <IconWrapper width={props.width || '56px'} height={props.height || '56px'}>
      <img src={newListIcon} alt="news list icon" />
    </IconWrapper>
  );
};

export default NewsListIcon;

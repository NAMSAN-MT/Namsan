import React from "react";
import IconWrapper from "../IconWrapper";
import removeIcon from "../../../assets/imgs/ic_-_nor.png";
import removeHoverIcon from "../../../assets/imgs/ic_-_hover.png";

interface PropTypes {
  width?: string;
  height?: string;
  hover?: boolean;
}

const RemoveIcon = (props: PropTypes) => {
  const src = props.hover ? removeHoverIcon : removeIcon;
  return (
    <IconWrapper width={props.width || "24px"} height={props.height || "24px"}>
      <img src={src} alt="add icon" />
    </IconWrapper>
  );
};

export default RemoveIcon;

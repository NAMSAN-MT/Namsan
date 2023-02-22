import React from "react";
import IconWrapper from "../IconWrapper";
import addIcon from "../../../assets/imgs/ic_+_nor.png";
import addHoverIcon from "../../../assets/imgs/ic_+_hover.png";

interface PropTypes {
  width?: string;
  height?: string;
  hover?: boolean;
}

const AddIcon = (props: PropTypes) => {
  const src = props.hover ? addHoverIcon : addIcon;
  return (
    <IconWrapper width={props.width || "24px"} height={props.height || "24px"}>
      <img src={src} alt="add icon" />
    </IconWrapper>
  );
};

export default AddIcon;

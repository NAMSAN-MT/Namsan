import React from "react";
import IconWrapper from "../IconWrapper";
import menuIcon from "../../../assets/imgs/ic_menu_nor.png";

interface PropTypes {
  width?: string;
  height?: string;
}

const MenuIcon = (props: PropTypes) => {
  return (
    <IconWrapper width={props.width || "24px"} height={props.height || "24px"}>
      <img src={menuIcon} alt="menu icon" />
    </IconWrapper>
  );
};

export default MenuIcon;

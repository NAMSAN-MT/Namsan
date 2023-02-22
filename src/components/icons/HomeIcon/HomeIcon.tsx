import React from "react";
import IconWrapper from "../IconWrapper";
import homeIcon from "../../../assets/imgs/ic_home.png";

interface PropTypes {
  width?: string;
  height?: string;
}

const HomeIcon = (props: PropTypes) => {
  return (
    <IconWrapper width={props.width || "18px"} height={props.height || "18px"}>
      <img src={homeIcon} alt="home icon" />
    </IconWrapper>
  );
};

export default HomeIcon;

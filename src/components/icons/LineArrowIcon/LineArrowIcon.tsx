import React from "react";
import IconWrapper from "../IconWrapper";
import arrowUpTh15Icon from "../../../assets/imgs/ic_arrow_up_th15.png";
import arrowDownTh15Icon from "../../../assets/imgs/ic_arrow_down_th15.png";
import arrowUpTh10Icon from "../../../assets/imgs/ic_arrow_up_th10.png";
import arrowDownTh10Icon from "../../../assets/imgs/ic_arrow_down_th10.png";
import arrowLeftTh5Icon from "../../../assets/imgs/ic_arrow_left_th5.png";
import arrowLeftTh10Icon from "../../../assets/imgs/ic_arrow_left_th10.png";
import arrowLeftTh15Icon from "../../../assets/imgs/ic_arrow_left_th15.png";
import arrowRightTh5Icon from "../../../assets/imgs/ic_arrow_right_th5.png";
import arrowRightTh10Icon from "../../../assets/imgs/ic_arrow_right_th10.png";
import arrowRightTh15Icon from "../../../assets/imgs/ic_arrow_right_th15.png";

interface PropTypes {
  width?: string;
  height?: string;
  direction: "UP" | "DOWN" | "LEFT" | "RIGHT";
  weight: "BOLD" | "NORMAL" | "LIGHT";
}

const LineArrowIcon = (props: PropTypes) => {
  let src, alt;

  if (props.direction === "UP") {
    switch (props.weight) {
      case "BOLD":
        src = arrowUpTh15Icon;
        alt = "arrow up th15 icon";
        break;
      case "NORMAL":
      default:
        src = arrowUpTh10Icon;
        alt = "arrow up th10 icon";
        break;
    }
  } else if (props.direction === "DOWN") {
    switch (props.weight) {
      case "BOLD":
        src = arrowDownTh15Icon;
        alt = "arrow down th15 icon";
        break;
      case "NORMAL":
      default:
        src = arrowDownTh10Icon;
        alt = "arrow down th10 icon";
        break;
    }
  } else if (props.direction === "LEFT") {
    switch (props.weight) {
      case "BOLD":
        src = arrowLeftTh15Icon;
        alt = "arrow left th15 icon";
        break;
      case "LIGHT":
        src = arrowLeftTh5Icon;
        alt = "arrow left th5 icon";
      case "NORMAL":
      default:
        src = arrowLeftTh10Icon;
        alt = "arrow left th10 icon";
        break;
    }
  } else if (props.direction === "RIGHT") {
    switch (props.weight) {
      case "BOLD":
        src = arrowRightTh15Icon;
        alt = "arrow right th15 icon";
        break;
      case "LIGHT":
        src = arrowRightTh5Icon;
        alt = "arrow right th5 icon";
      case "NORMAL":
      default:
        src = arrowRightTh10Icon;
        alt = "arrow right th10 icon";
        break;
    }
  }

  return (
    <IconWrapper width={props.width || "24px"} height={props.height || "24px"}>
      <img src={src} alt={alt} />
    </IconWrapper>
  );
};

export default LineArrowIcon;

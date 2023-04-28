import React from "react";
import * as S from "./IconWrapper.style";

interface PropTypes {
  children: React.ReactNode;
  width?: string;
  height?: string;
}

const IconWrapper = (props: PropTypes) => {
  return (
    <S.Wrapper width={props.width || "18px"} height={props.height || "18px"}>
      {props.children}
    </S.Wrapper>
  );
};

export default IconWrapper;

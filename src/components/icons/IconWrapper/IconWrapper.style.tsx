import styled from "styled-components";

export const Wrapper = styled.div<{ width: string; height: string }>`
  margin: 0;
  padding: 0;
  cursor: pointer;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  & img {
    width: 100%;
    height: 100%;
  }
`;

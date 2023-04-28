import "styled-components";
import { ColorType } from "./styles/varialbes.style";

declare module "styled-components" {
  export interface DefaultTheme {
    color: ColorType;
  }
}

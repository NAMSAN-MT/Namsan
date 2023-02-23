import { TClassName } from './IconButton.interface';
import * as S from './IconButton.style';
import ArrowUp from '@Images/ArrowUp.svg';
import Hambergur from '@Images/Hamburger.svg';
import Share from '@Images/Share.svg';

const bindStyle = (name: TClassName) => {
  switch (name) {
    case 'arrow-top':
      return S.ArrowTop;
    case 'hamburger':
      return S.Hamburger;
    case 'share':
      return S.Share;
    default:
      return S.Base;
  }
};

const bindIcon = (name: TClassName) => {
  switch (name) {
    case 'arrow-top':
      return ArrowUp;
    case 'hamburger':
      return Hambergur;
    case 'share':
      return Share;
    default:
      return ArrowUp;
  }
};

export { bindStyle, bindIcon };

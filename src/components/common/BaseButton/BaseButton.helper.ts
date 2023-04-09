import { TClassName } from './BaseButton.interface';
import * as S from './BaseButton.style';

const bindStyle = (name: TClassName) => {
  switch (name) {
    case 'primary':
      return S.Primary;
    case 'support':
      return S.Support;
    case 'support-line':
      return S.SupportLine;
    case 'outline':
      return S.Outline;
    case 'tag':
      return S.Tag;
    case 'arrow-top':
      return S.ArrowTop;
    case 'hamburger':
      return S.Hamburger;
    case 'share':
      return S.Share;
    case 'more':
      return S.More;
    case 'download':
      return S.Download;
    case 'direct':
      return S.Direct;
    default:
      return S.Base;
  }
};

const checkIsIcon = (name: TClassName) => {
  switch (name) {
    case 'primary':
      return false;
    case 'support':
      return false;
    case 'support-line':
      return false;
    case 'outline':
      return false;
    case 'tag':
      return false;
    case 'arrow-top':
      return true;
    case 'hamburger':
      return true;
    case 'share':
      return true;
    case 'more':
      return true;
    case 'download':
      return true;
    case 'direct':
      return true;
    default:
      return false;
  }
};

export { bindStyle, checkIsIcon };

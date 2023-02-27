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
    case 'text':
      return S.Text;
    default:
      return S.Base;
  }
};

export { bindStyle };

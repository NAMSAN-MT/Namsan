import { MouseEventHandler } from 'react';
import { TUrl } from '../GNB/GNB.interface';

interface ILayoutProps {
  children: React.ReactNode;
  isMobile?: boolean;
  isHeader?: boolean;
  isFooter?: boolean;
  route?: TUrl;
  isTransparent?: boolean;
}

interface ITopButtonProps {
  mouseOverFromTopButton: boolean;
  setMouseOverFromTopButton: React.Dispatch<React.SetStateAction<boolean>>;
  handleTopEvent: (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement, MouseEvent>,
  ) => void;
}
interface ICopyButtonProps {
  isCopyButton: boolean;
  toastMessage: string;
  handleCopyLink: MouseEventHandler<HTMLButtonElement>;
}

export { ILayoutProps, ITopButtonProps, ICopyButtonProps };

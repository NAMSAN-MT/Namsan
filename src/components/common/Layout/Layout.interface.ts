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

export { ILayoutProps, ITopButtonProps };

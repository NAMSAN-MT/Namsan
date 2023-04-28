import { TUrl } from '../GNB/GNB.interface';

interface ILayoutProps {
  children: React.ReactNode;
  isMobile?: boolean;
  isHeader?: boolean;
  isFooter?: boolean;
  route?: TUrl;
  isTransparent?: boolean;
}

export { ILayoutProps };

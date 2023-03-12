import { TUrl } from '../GNB/GNB.interface';

interface ILayoutProps {
  children: React.ReactNode;
  isHeader?: boolean;
  isFooter?: boolean;
  route?: TUrl;
}

export { ILayoutProps };

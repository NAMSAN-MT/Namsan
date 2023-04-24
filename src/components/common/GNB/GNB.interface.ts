import { WrappedComponentProps } from 'gatsby-plugin-intl';
import { MouseEventHandler } from 'react';

type TUrl =
  | 'main'
  | 'introduce'
  | 'work'
  | 'workDetail'
  | 'members'
  | 'news'
  | 'contact';

interface IGNBProps extends WrappedComponentProps {}

interface IMobileMenuButtonProps {
  isMobileMenuOpen: boolean;
  onClick: MouseEventHandler;
}

export { TUrl, IGNBProps, IMobileMenuButtonProps };

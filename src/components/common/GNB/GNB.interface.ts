import { WrappedComponentProps } from 'gatsby-plugin-intl';
import { MouseEventHandler } from 'react';

type TUrl = 'main' | 'introduce' | 'work' | 'members' | 'news' | 'contact';

interface IGNBProps extends WrappedComponentProps {}

interface IMobileMenuButtonProps {
  isOpen: boolean;
  onClick: MouseEventHandler;
}

export { TUrl, IGNBProps, IMobileMenuButtonProps };

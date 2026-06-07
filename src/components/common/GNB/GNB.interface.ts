import { MouseEventHandler } from 'react';
import { WithIntlProps } from '@Hocs/withTranslations';

type TUrl =
  | 'main'
  | 'introduce'
  | 'work'
  | 'workDetail'
  | 'members'
  | 'news'
  | 'newsDetail'
  | 'contact';

interface IGNBProps extends WithIntlProps {
  isTransparent?: boolean;
  isMobile?: boolean;
}

interface IMobileMenuButtonProps {
  isMobileMenuOpen: boolean;
  onClick: MouseEventHandler;
  isMobile?: boolean;
}

export type { TUrl, IGNBProps, IMobileMenuButtonProps };

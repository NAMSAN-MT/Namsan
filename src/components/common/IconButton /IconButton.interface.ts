import { IButtonProps } from '../BaseButton/BaseButton.interface';
type TClassName = 'arrow-top' | 'hamburger' | 'share';

interface IIconButtonProps
  extends Omit<IButtonProps, 'className' | 'children'> {
  className: TClassName;
}

export { TClassName, IIconButtonProps };

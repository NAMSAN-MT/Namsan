type TClassName =
  | 'primary'
  | 'support'
  | 'support-line'
  | 'outline'
  | 'tag'
  | 'arrow-top'
  | 'copy'
  | 'hamburger'
  | 'hamburger-news'
  | 'share'
  | 'download'
  | 'direct'
  | 'more';
type TType = 'button' | 'submit' | 'reset';

interface IButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  className: TClassName;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: TType;
}

export { TClassName, TType, IButtonProps };

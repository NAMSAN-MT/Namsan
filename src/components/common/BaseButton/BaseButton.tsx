import React from 'react';
import { IButtonProps } from './BaseButton.interface';
import { bindStyle } from './BaseButton.helper';

const BaseButton: React.FC<IButtonProps> = (props: IButtonProps) => {
  const Button = bindStyle(props.className);
  return <Button {...props}>{props.children}</Button>;
};

export default BaseButton;

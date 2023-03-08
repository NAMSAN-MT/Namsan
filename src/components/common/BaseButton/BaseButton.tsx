import React from 'react';
import { IButtonProps } from './BaseButton.interface';
import { bindStyle, checkIsIcon } from './BaseButton.helper';

const BaseButton: React.FC<IButtonProps> = (props: IButtonProps) => {
  const Button = bindStyle(props.className);
  const isIcon = checkIsIcon(props.className);

  return (
    <Button {...props}>
      {props.children}
      {isIcon ? <div className="icon" /> : null}
    </Button>
  );
};

export default BaseButton;

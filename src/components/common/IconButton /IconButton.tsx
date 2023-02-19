import React from 'react';
import { IIconButtonProps } from './IconButton.interface';
import { bindStyle, bindIcon } from './IconButton.helper';

const IconButton: React.FC<IIconButtonProps> = (props: IIconButtonProps) => {
  const Button = bindStyle(props.className);
  const Icon = bindIcon(props.className);

  return (
    <Button {...props}>
      <img src={Icon} alt="icon" />
    </Button>
  );
};

export default IconButton;

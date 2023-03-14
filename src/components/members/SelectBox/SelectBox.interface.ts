import { Dispatch, MouseEventHandler, SetStateAction } from 'react';

interface ISelectBoxProps {
  options: string[];
  title: string;
  handleClick: MouseEventHandler;
  currentOption: string;
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export { ISelectBoxProps };

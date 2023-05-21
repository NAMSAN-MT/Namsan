import { ChangeEventHandler, FormEventHandler } from 'react';

interface IInputProps {
  iconSize?: {
    width: string;
    height: string;
  };

  placeholder?: string;
  value: string;
  handleChange: ChangeEventHandler;
  handleSubmit?: FormEventHandler;
}

export { IInputProps };

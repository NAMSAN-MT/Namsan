import { WrappedComponentProps } from 'gatsby-plugin-intl';
import { ChangeEventHandler, FormEventHandler } from 'react';

interface IInputProps {
  placeholder?: string;
  value: string;
  handleChange: ChangeEventHandler;
  handleSubmit?: FormEventHandler;
}

export { IInputProps };

import React from 'react';
import { ContactWrapperProps } from './ContactWrapper.interface';
import * as S from './ContactWrapper.style';

const ContactWrapper = (props: ContactWrapperProps) => {
  return <S.ContactWrapper>{props.children}</S.ContactWrapper>;
};

export default ContactWrapper;

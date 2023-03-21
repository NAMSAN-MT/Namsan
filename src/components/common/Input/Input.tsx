import SearchIcon from '@Components/icons/SearchIcon';
import React from 'react';
import { IInputProps } from './Input.interface';
import * as S from './Input.style';

const Input = ({
  placeholder,
  value,
  handleChange,
  handleSubmit,
}: IInputProps) => {
  return (
    <S.InputWrapper onSubmit={handleSubmit}>
      <S.Input
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      ></S.Input>
      <S.SearchIconWrapper type="submit">
        <SearchIcon />
      </S.SearchIconWrapper>
    </S.InputWrapper>
  );
};

export default Input;

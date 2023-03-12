import LineArrowIcon from '@Components/icons/LineArrowIcon';
import React, { useState } from 'react';
import { ISelectBoxProps } from './SelectBox.interface';
import * as S from './SelectBox.style';

const SelectBox = ({
  options,
  title,
  handleClick,
  currentOption,
  isOpen,
  setOpen,
}: ISelectBoxProps) => {
  const arrowDirection = isOpen ? 'DOWN' : 'UP';

  const _toggle = () => {
    setOpen(!isOpen);
  };

  return (
    <S.Select onClick={_toggle} isOpen={isOpen}>
      <span>{title}</span>
      {isOpen && (
        <S.OptionWrapper>
          {options.map(option => {
            return (
              <S.Option
                isSelected={currentOption === option}
                data-option={option}
                onClick={handleClick}
              >
                <span>{option}</span>
              </S.Option>
            );
          })}
        </S.OptionWrapper>
      )}
      <S.OpenIconWrapper>
        <LineArrowIcon direction={arrowDirection} weight="BOLD" />
      </S.OpenIconWrapper>
    </S.Select>
  );
};

export default SelectBox;

import LottieWrapper from '@Components/common/LottieWrapper/LottieWrapper';
import React, { useState } from 'react';
import NavigationDown from '../../../assets/lottie/navigation_down.json';
import NavigationUp from '../../../assets/lottie/navigation_up.json';
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
  const [isFirstRender, setIsFirstRender] = useState(true);
  const arrowDirection = isOpen
    ? isFirstRender
      ? { ...NavigationDown, fr: 0, op: 1 }
      : NavigationUp
    : isFirstRender
    ? { ...NavigationUp, fr: 0, op: 1 }
    : NavigationDown;

  const _toggle = () => {
    setOpen(!isOpen);
    setIsFirstRender(false);
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
        <LottieWrapper
          animationData={arrowDirection}
          width={24}
          loop={false}
          autoplay={true}
        />
      </S.OpenIconWrapper>
    </S.Select>
  );
};

export default SelectBox;

import React from 'react';
import { ISelectBoxProps } from './SelectBox.interface';
import * as S from './SelectBox.style';
import NavigationUp from '../../../assets/lottie/navigation_up.json';
import NavigationDown from '../../../assets/lottie/navigation_down.json';
import LottieWrapper from '@Components/common/LottieWrapper/LottieWrapper';

const SelectBox = ({
  options,
  title,
  handleClick,
  currentOption,
  isOpen,
  setOpen,
}: ISelectBoxProps) => {
  const arrowDirection = isOpen ? NavigationUp : NavigationDown;

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

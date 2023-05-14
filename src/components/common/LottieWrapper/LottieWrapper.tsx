import React from 'react';
import { ILottieWrapperProps } from './LottieWrapper.interface';
import Lottie, { Options } from 'react-lottie';

const LottieWrapper = (props: ILottieWrapperProps) => {
  const animationLoopOptions: Options = {
    loop: props.loop,
    autoplay: props.autoplay,
    animationData: props.animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <Lottie
      options={animationLoopOptions}
      width={props.width}
      height={props.height}
    />
  );
};

export default LottieWrapper;

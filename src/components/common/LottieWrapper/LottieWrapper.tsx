import React, { useEffect, useState } from 'react';
import { ILottieWrapperProps } from './LottieWrapper.interface';
import Lottie, { Options } from 'react-lottie';

const LottieWrapper = (props: ILottieWrapperProps) => {
  // react-lottie is browser-only and renders a different DOM on the client (an
  // animated <svg>) than the server. Branching on `typeof window` during render
  // made the server emit a placeholder while the client's FIRST paint emitted
  // <Lottie> → hydration mismatch. Render the placeholder until after mount
  // (identical on server + client first paint), then swap in Lottie. (gatsby
  // avoided this entirely by null-loadering react-lottie for SSR.)
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted || typeof Lottie !== 'function') {
    return <div style={{ width: props.width, height: props.height }} />;
  }

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
      eventListeners={props.eventListeners}
      options={animationLoopOptions}
      width={props.width}
      height={props.height}
      isStopped={props.stop}
      isPaused={props.isPaused}
      isClickToPauseDisabled={true}
    />
  );
};

export default LottieWrapper;

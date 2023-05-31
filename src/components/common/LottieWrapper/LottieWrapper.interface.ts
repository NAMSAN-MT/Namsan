import { EventListener } from 'react-lottie';

interface ILottieWrapperProps {
  animationData: any;
  width?: number;
  height?: number;
  loop?: boolean;
  autoplay?: boolean;
  stop?: boolean;
  isPaused?: boolean;
  eventListeners?: ReadonlyArray<EventListener>;
}

export { ILottieWrapperProps };

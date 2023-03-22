import { TVariantName } from './AnimationWrapper.interface';

const scaleVariant = {
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  hidden: { opacity: 0, scale: 0 },
};

const transitionVariant = {
  visible: { opacity: 1, transition: { type: 'spring', duration: 1 } },
  hidden: { opacity: 0 },
};

const bindVariant = (name: TVariantName) => {
  switch (name) {
    case 'transition':
      return transitionVariant;
    case 'scale':
      return scaleVariant;
    default:
      return transitionVariant;
  }
};

export { bindVariant };

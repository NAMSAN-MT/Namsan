import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { IAnimationWrapperProps } from './AnimationWrapper.interface';
import { bindVariant } from './AnimationWrapper.helper';

const AnimationWrapper: React.FC<IAnimationWrapperProps> = (
  props: IAnimationWrapperProps,
) => {
  const control = useAnimation();
  const [ref, inView] = useInView({
    threshold: props.threshold,
  });

  const boxVariant = bindVariant(props.variantName);

  useEffect(() => {
    if (inView) {
      control.start('visible');
    } else {
      control.start('hidden');
    }
  }, [control, inView]);

  return (
    <motion.div
      ref={ref}
      variants={boxVariant}
      initial={props.initial}
      animate={control}
    >
      {props.children}
    </motion.div>
  );
};

export default AnimationWrapper;

import React, { useEffect, useState } from 'react';
import { AnimationImageProps } from './AnimationImage.interface';
import * as S from './AnimationImage.style';

const AnimationImage = (props: AnimationImageProps) => {
  const [on, setOn] = useState<boolean>(false);
  const ref = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver((event: any) => {
      if (event[0].intersectionRatio > 0) {
        setOn(true);
      }
    });
    observer.observe(ref.current);
  }, []);

  return (
    <S.AnimationImageWrapper src={props.imageSrc}>
      <S.Dim className={on ? 'on' : ''} />
      <S.TextWrapper ref={ref} className={on ? 'on' : ''}>
        <S.MainText>{props.mainText}</S.MainText>
        <S.SubText>{props.subText}</S.SubText>
      </S.TextWrapper>
    </S.AnimationImageWrapper>
  );
};

export default AnimationImage;

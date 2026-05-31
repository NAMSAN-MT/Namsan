import { useEffect, useState } from 'react';
import { IFirstSectionProps } from './FirstSection.interface';
import Intro0 from '@Images/intro.gif';
import Intro1 from '@Images/intro01.png';
import Intro2 from '@Images/intro02.png';
import Intro3 from '@Images/intro03.png';
import Intro4 from '@Images/intro04.png';

import IntroMobile0 from '@Images/introMobile.gif';
import IntroMobile1 from '@Images/introMobile01.png';
import IntroMobile2 from '@Images/introMobile02.png';
import IntroMobile3 from '@Images/introMobile03.png';
import IntroMobile4 from '@Images/introMobile04.png';

const useFirstSection = (props: IFirstSectionProps) => {
  const [startSlide, setStartSlide] = useState(false);
  const [pictures, setPictures] = useState<string[]>([]);
  const [intro, setIntro] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setStartSlide(true);
    }, 5100);
    return () => {
      setStartSlide(false);
    };
  }, []);

  useEffect(() => {
    if (props.isMobile) {
      // mobile
      setIntro(IntroMobile0.src);
      setPictures([
        IntroMobile1.src,
        IntroMobile2.src,
        IntroMobile3.src,
        IntroMobile4.src,
      ]);
      return;
    }

    // desktop
    setIntro(Intro0.src);
    setPictures([Intro1.src, Intro2.src, Intro3.src, Intro4.src]);
  }, [props.isMobile]);

  return {
    pictures,
    startSlide,
    intro,
  };
};

export default useFirstSection;

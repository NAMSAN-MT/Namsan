import { useEffect, useState } from 'react';
import { IFirstSectionProps } from './FirstSection.interface';
import Intro0 from '@Images/intro.webp';
import Intro1 from '@Images/intro01.webp';
import Intro2 from '@Images/intro02.webp';
import Intro3 from '@Images/intro03.webp';
import Intro4 from '@Images/intro04.webp';

import IntroMobile0 from '@Images/introMobile.webp';
import IntroMobile1 from '@Images/introMobile01.webp';
import IntroMobile2 from '@Images/introMobile02.webp';
import IntroMobile3 from '@Images/introMobile03.webp';
import IntroMobile4 from '@Images/introMobile04.webp';

// intro gif 재생 시간(ms). carousel interval(5000)보다 약간 길게 두어 끊김 없이 전환.
const INTRO_DURATION = 5100;

const DESKTOP = {
  intro: Intro0.src,
  pictures: [Intro1.src, Intro2.src, Intro3.src, Intro4.src],
};
const MOBILE = {
  intro: IntroMobile0.src,
  pictures: [
    IntroMobile1.src,
    IntroMobile2.src,
    IntroMobile3.src,
    IntroMobile4.src,
  ],
};

const useFirstSection = (props: IFirstSectionProps) => {
  const [startSlide, setStartSlide] = useState(false);
  // 첫 렌더부터 실제 src를 채워 둔다(빈 상태→주입 시 발생하던 초기 CLS 제거).
  const initial = props.isMobile ? MOBILE : DESKTOP;
  const [pictures, setPictures] = useState<string[]>(initial.pictures);
  const [intro, setIntro] = useState(initial.intro);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartSlide(true);
    }, INTRO_DURATION);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const set = props.isMobile ? MOBILE : DESKTOP;
    setIntro(set.intro);
    setPictures(set.pictures);
  }, [props.isMobile]);

  return {
    pictures,
    startSlide,
    intro,
  };
};

export default useFirstSection;

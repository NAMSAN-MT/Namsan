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
  const [zero, setZero] = useState(false);
  const [first, setFirst] = useState(false);
  const [second, setSecond] = useState(false);
  const [third, setThird] = useState(false);
  const [forth, setForth] = useState(false);
  const [startSlide, setStartSlide] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [intro0, setIntro0] = useState(Intro0);
  const [intro1, setIntro1] = useState(Intro1);
  const [intro2, setIntro2] = useState(Intro2);
  const [intro3, setIntro3] = useState(Intro3);
  const [intro4, setIntro4] = useState(Intro4);

  const millisec = 10000;

  useEffect(() => {
    if (startSlide) {
      const interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
        if (first) {
          _init();
          setSecond(true);
        } else if (second) {
          _init();
          setThird(true);
        } else if (third) {
          _init();
          setForth(true);
        } else if (forth) {
          _init();
          setFirst(true);
        }
      }, millisec);
      return () => clearInterval(interval);
    }
  }, [startSlide, first, second, third, forth]);

  useEffect(() => {
    setZero(true);
    setTimeout(() => {
      setStartSlide(true);
      setFirst(true);
      setZero(false);
    }, 4600);
  }, []);

  const _init = () => {
    setZero(false);
    setFirst(false);
    setSecond(false);
    setThird(false);
    setForth(false);
  };

  useEffect(() => {
    if (props.isMobile) {
      // mobile
      setIntro0(IntroMobile0);
      setIntro1(IntroMobile1);
      setIntro2(IntroMobile2);
      setIntro3(IntroMobile3);
      setIntro4(IntroMobile4);
      return;
    }

    // desktop
    setIntro0(Intro0);
    setIntro1(Intro1);
    setIntro2(Intro2);
    setIntro3(Intro3);
    setIntro4(Intro4);
    return;
  }, [props.isMobile]);

  return {
    zero,
    first,
    second,
    third,
    forth,
    seconds,
    intro0,
    intro1,
    intro2,
    intro3,
    intro4,
  };
};

export default useFirstSection;

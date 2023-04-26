import { Screen } from '@Styles/varialbes.style';
import { useEffect, useState } from 'react';

const useResize = () => {
  const [isMobile, setMobile] = useState(false);
  const [isTablet, setTablet] = useState(false);
  const [isDesktop, setDesktop] = useState(false);

  const checkMobile = () => {
    const isDesktop = window.outerWidth > Screen.tablet;
    const isMobile = window.outerWidth < Screen.mobile;
    const isTablet =
      window.outerWidth > Screen.mobile && window.outerWidth < Screen.tablet;

    setDesktop(isDesktop);
    setMobile(isMobile);
    setTablet(isTablet);
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.addEventListener('resize', checkMobile);
    checkMobile();
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return {
    isMobile,
    isTablet,
    isDesktop,
  };
};

export default useResize;

import { Screen } from '@Styles/varialbes.style';
import { useEffect, useState } from 'react';

const useResize = () => {
  const [isMobile, setMobile] = useState(false);
  const [isTablet, setTablet] = useState(false);

  const checkMobile = () => {
    const isMobile = window.innerWidth < Screen.mobile;
    const isTablet =
      window.innerWidth > Screen.mobile && window.innerWidth < Screen.tablet;

    setMobile(isMobile);
    setTablet(isTablet);
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setMobile(window.innerWidth < Screen.mobile);
    window.addEventListener('resize', checkMobile);
    checkMobile();
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return {
    isMobile,
    isTablet,
  };
};

export default useResize;

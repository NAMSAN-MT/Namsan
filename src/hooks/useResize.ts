import { Screen } from '@Styles/varialbes.style';
import { useEffect, useState } from 'react';

const useResize = () => {
  const [isMobile, setMobile] = useState(false);

  const checkMobile = () => {
    const isMobile = window.innerWidth < Screen.mobile;
    setMobile(isMobile);
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setMobile(window.innerWidth < Screen.mobile);
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return {
    isMobile,
  };
};

export default useResize;

import { isEmpty } from 'lodash';
import { useRef, useState, useEffect } from 'react';

const useLayout = () => {
  const [toastMessage, setToastMessage] = useState('');
  const [clickTopButton, setClickTopButton] = useState(false);
  const interval = useRef<NodeJS.Timeout>();
  useEffect(() => {
    if (toastMessage) {
      interval.current = setInterval(() => {
        setToastMessage('');
      }, 2000);
    }
    return () => clearInterval(interval.current);
  }, [toastMessage]);

  const handleTopEvent = (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>,
  ) => {
    e.preventDefault();
    setClickTopButton(true);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleCopyLink = (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>,
  ) => {
    e.preventDefault();
    navigator.clipboard.writeText(window.location.href);
    isEmpty(toastMessage) && setToastMessage('링크가 복사 되었습니다.');
  };

  return {
    toastMessage,
    handleTopEvent,
    handleCopyLink,
    clickTopButton,
    setClickTopButton,
  };
};

export default useLayout;

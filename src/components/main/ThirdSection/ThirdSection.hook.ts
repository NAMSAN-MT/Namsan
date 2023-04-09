import { useState, useEffect } from 'react';
import useNavigate from '@Hooks/useNavigate';
import { getVideo } from '@Api/main.api';

const useThirdSection = () => {
  const { handleNavigate } = useNavigate();
  const [mainVideo, setMainVideo] = useState<string>();

  useEffect(() => {
    const init = async () => {
      const mainVideo = await getVideo('main/cardFull.mp4');
      setMainVideo(mainVideo);
    };
    init();
  }, []);

  const handleNavigateTo = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    handleNavigate('work');
  };

  return {
    handleNavigateTo,
    mainVideo,
  };
};

export default useThirdSection;

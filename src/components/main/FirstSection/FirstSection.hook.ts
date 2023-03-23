import { getVideo } from '@Api/main.api';
import { useEffect, useState } from 'react';

const useFirstSection = () => {
  const [mainVideo, setMainVideo] = useState<string>();

  useEffect(() => {
    const init = async () => {
      const mainVideo = await getVideo('main/mainFull.mp4');
      setMainVideo(mainVideo);
    };
    init();
  }, []);

  return {
    mainVideo,
  };
};

export default useFirstSection;

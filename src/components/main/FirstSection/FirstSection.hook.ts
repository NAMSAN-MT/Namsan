import { getVideo } from '@Api/main.api';
import { useEffect, useState } from 'react';
import { IFirstSectionProps } from './FirstSection.interface';

const useFirstSection = (props: IFirstSectionProps) => {
  const [mainVideo, setMainVideo] = useState<string>();

  useEffect(() => {
    const init = async () => {
      if (props.isMobile) {
        const mainVideo = await getVideo('main/MmainFull.mp4');
        setMainVideo(mainVideo);
        return;
      }
      const mainVideo = await getVideo('main/mainFull2.mp4');
      setMainVideo(mainVideo);
    };
    init();
  }, [props.isMobile]);

  return {
    mainVideo,
  };
};

export default useFirstSection;

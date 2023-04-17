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
      // TODO: check it
      // const mainVideo = await getVideo('main/mainFull1.mp4');
      const mainVideo = await getVideo('main/mainFull2.mp4');
      setMainVideo(mainVideo);
    };
    init();
  }, []);

  return {
    mainVideo,
  };
};

export default useFirstSection;

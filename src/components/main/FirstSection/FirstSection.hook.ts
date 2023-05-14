import { getVideo } from '@Api/main.api';
import { useEffect, useRef, useState } from 'react';
import { IFirstSectionProps } from './FirstSection.interface';
import { useIntl } from 'gatsby-plugin-intl';

const useFirstSection = (props: IFirstSectionProps) => {
  const { locale } = useIntl();
  const [mainVideo, setMainVideo] = useState<string>();

  useEffect(() => {
    const init = async () => {
      if (locale === 'ko') {
        if (props.isMobile) {
          // ko & mobile
          const mainVideo = await getVideo('main/MmainFull.mp4');
          setMainVideo(mainVideo);
          return;
        }

        // ko & desktop
        const mainVideo = await getVideo('main/mainFull2.mp4');
        setMainVideo(mainVideo);
        return;
      }

      if (props.isMobile) {
        // en & mobile
        const mainVideo = await getVideo('main/MmainFull_EN.mp4');
        setMainVideo(mainVideo);
        return;
      }

      // en & desktop
      const mainVideo = await getVideo('main/mainFull_EN.mp4');
      setMainVideo(mainVideo);
    };
    init();
  }, [props.isMobile]);

  return {
    mainVideo,
  };
};

export default useFirstSection;

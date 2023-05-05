import { useState, useEffect } from 'react';
import useNavigate from '@Hooks/useNavigate';
import { getVideo } from '@Api/main.api';
import { IThirdSectionProps } from './ThirdSection.interface';
import { useIntl } from 'gatsby-plugin-intl';

const useThirdSection = (props: IThirdSectionProps) => {
  const { locale } = useIntl();
  const { handleNavigate } = useNavigate();
  const [mainVideo, setMainVideo] = useState<string>();

  useEffect(() => {
    const init = async () => {
      if (locale === 'ko') {
        if (props.isMobile) {
          // ko & mobile
          const mainVideo = await getVideo('main/McardFull.mov');
          setMainVideo(mainVideo);
          return;
        }

        if (props.isTablet) {
          // ko & tablet
          const mainVideo = await getVideo('main/TcardFull.mov');
          setMainVideo(mainVideo);
          return;
        }

        // ko & desktop
        const mainVideo = await getVideo('main/cardFull.mov');
        setMainVideo(mainVideo);
        return;
      }

      if (props.isMobile) {
        // en & mobile
        const mainVideo = await getVideo('main/McardFull_EN.mov');
        setMainVideo(mainVideo);
        return;
      }

      if (props.isTablet) {
        // en & tablet
        const mainVideo = await getVideo('main/TcardFull.mov');
        setMainVideo(mainVideo);
        return;
      }

      // en & desktop
      const mainVideo = await getVideo('main/cardFull_EN.mov');
      setMainVideo(mainVideo);
    };
    init();
  }, [props.isMobile || props.isTablet]);

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

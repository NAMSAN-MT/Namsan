import { useState, useEffect } from 'react';
import useNavigate from '@Hooks/useNavigate';
import { getVideo } from '@Api/main.api';
import { IThirdSectionProps } from './ThirdSection.interface';
import { useIntl } from 'gatsby-plugin-intl';
import cardEN from '@Images/card_EN.png';
import cardKO from '@Images/card_KR.png';
import cardMobileEN from '@Images/card_mobile_EN.png';
import cardMobileKO from '@Images/card_mobile_KR.png';

const useThirdSection = (props: IThirdSectionProps) => {
  const { locale } = useIntl();
  const { handleNavigate } = useNavigate();
  const [mainVideo, setMainVideo] = useState<string>();
  const [mainPoster, setMainPoster] = useState<string>(cardKO);
  const [isKakaoBrower, setKakaoBrower] = useState(false);

  useEffect(() => {
    const init = async () => {
      const isKakao = navigator.userAgent.match('KAKAOTALK');
      setKakaoBrower(Boolean(isKakao));
      if (locale === 'ko') {
        if (props.isMobile) {
          // ko & mobile
          const mainVideo = await getVideo('main/McardFull.mp4');
          setMainVideo(mainVideo);
          setMainPoster(cardMobileKO);

          return;
        }

        if (props.isTablet) {
          // ko & tablet
          const mainVideo = await getVideo('main/cardFull.mp4');
          setMainVideo(mainVideo);
          setMainPoster(cardKO);
          return;
        }

        // ko & desktop
        const mainVideo = await getVideo('main/cardFull.mp4');
        setMainVideo(mainVideo);
        setMainPoster(cardKO);
        return;
      }

      if (props.isMobile) {
        // en & mobile
        const mainVideo = await getVideo('main/McardFull_EN.mp4');
        setMainVideo(mainVideo);
        setMainPoster(cardMobileEN);
        return;
      }

      if (props.isTablet) {
        // en & tablet
        const mainVideo = await getVideo('main/cardFull_EN.mp4');
        setMainVideo(mainVideo);
        setMainPoster(cardEN);
        return;
      }

      // en & desktop
      const mainVideo = await getVideo('main/cardFull_EN.mp4');
      setMainVideo(mainVideo);
      setMainPoster(cardEN);
    };
    init();
  }, [props.isMobile, props.isTablet, locale, mainVideo]);

  const handleNavigateTo = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    handleNavigate('work');
  };

  return {
    handleNavigateTo,
    mainVideo,
    mainPoster,
    isKakaoBrower,
  };
};

export default useThirdSection;

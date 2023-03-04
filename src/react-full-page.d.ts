declare module 'react-full-page' {
  const scrollMode = {
    FULL_PAGE: 'full-page',
    NORMAL: 'normal',
  };

  type ControlComponentsProps = {
    getCurrentSlideIndex: () => number;
    onNext: () => void;
    onPrev: () => void;
    scrollToSlide: (n: number) => void;
    slidesCount: number;
    children: React.ReactNode;
  };

  type FullPageProps = {
    afterChange?: () => void;
    beforeChange?: () => void;
    children: React.ReactNode;
    controls?: boolean | React.FC<ControlComponentsProps>;
    controlsProps?: object;
    duration?: number;
    initialSlide?: number;
    scrollMode?: scrollMode.FULL_PAGE | scrollMode.NORMAL;
  };

  type SlideProps = {
    children: React.ReactNode;
    style?: { maxHeight: string };
  };

  export const FullPage: React.FC<FullPageProps>;

  export const Slide: React.FC<SlideProps>;
}

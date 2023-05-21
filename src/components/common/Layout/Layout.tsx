import { isEmpty } from 'lodash';
import React from 'react';
import BaseButton from '../BaseButton';
import Footer from '../Footer';
import GNB from '../GNB';
import useLayout from './Layout.hook';
import { ILayoutProps, ITopButtonProps } from './Layout.interface';
import * as S from './Layout.style';
import LottieWrapper from '../LottieWrapper/LottieWrapper';
import ButtonTop from '../../../assets/lottie/button_top.json';
import ButtonLink from '../../../assets/lottie/button_link.json';

const TopMenuButton = ({
  mouseOverFromTopButton,
  handleTopEvent,
  setMouseOverFromTopButton,
}: ITopButtonProps) => {
  return (
    <>
      {mouseOverFromTopButton ? (
        <S.TopButtonInner
          onClick={handleTopEvent}
          onMouseLeave={() => setMouseOverFromTopButton(false)}
        >
          <LottieWrapper
            animationData={ButtonTop}
            width={60}
            loop={false}
            autoplay={true}
          />
        </S.TopButtonInner>
      ) : (
        <BaseButton
          className="arrow-top"
          onClick={handleTopEvent}
          onMouseOver={() => setMouseOverFromTopButton(true)}
        />
      )}
    </>
  );
};

const Layout: React.FC<ILayoutProps> = (props: ILayoutProps) => {
  const { isHeader = true, isFooter = true, children, route } = props;
  const {
    toastMessage,
    handleTopEvent,
    handleCopyLink,
    mouseOverFromTopButton,
    setMouseOverFromTopButton,
  } = useLayout();
  const isMainPage = ['main', 'workDetail'].includes(route ?? '');
  const isFloating = ['newsDetail'].includes(route ?? '');

  return (
    <S.LayoutWrapper>
      {isHeader ? (
        <GNB isMobile={props.isMobile} isTransparent={props.isTransparent} />
      ) : null}
      <S.LayoutContent isMainPage={isMainPage}>
        {children}
        {!isFloating && (
          <S.TopButtonWrapper isTransparent={props.isTransparent}>
            <TopMenuButton
              mouseOverFromTopButton={mouseOverFromTopButton}
              handleTopEvent={handleTopEvent}
              setMouseOverFromTopButton={setMouseOverFromTopButton}
            />
          </S.TopButtonWrapper>
        )}
        {isFloating && (
          <S.FloatingWrapper>
            <div className="blank" />
            <div className="area">
              <BaseButton className="copy" onClick={handleCopyLink} />
              <BaseButton className="arrow-top" onClick={handleTopEvent} />
            </div>
          </S.FloatingWrapper>
        )}
        <S.ToastWrapper isVisible={!isEmpty(toastMessage)}>
          <S.Toast>{toastMessage}</S.Toast>
        </S.ToastWrapper>
      </S.LayoutContent>
      {isFooter ? <Footer /> : null}
    </S.LayoutWrapper>
  );
};

export default Layout;

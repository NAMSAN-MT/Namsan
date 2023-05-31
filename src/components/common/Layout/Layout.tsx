import { isEmpty } from 'lodash';
import React from 'react';
import BaseButton from '../BaseButton';
import Footer from '../Footer';
import GNB from '../GNB';
import useLayout from './Layout.hook';
import {
  ICopyButtonProps,
  ILayoutProps,
  ITopButtonProps,
} from './Layout.interface';
import * as S from './Layout.style';
import LottieWrapper from '../LottieWrapper/LottieWrapper';
import ButtonTop from '../../../assets/lottie/button_top.json';
import ButtonLink from '../../../assets/lottie/button_link.json';

const TopMenuButton = ({
  clickTopButton,
  handleTopEvent,
  setClickTopButton,
}: ITopButtonProps) => {
  return (
    <S.TopButtonInner
      onClick={handleTopEvent}
      onMouseDown={() => setClickTopButton(false)}
    >
      <LottieWrapper
        animationData={ButtonTop}
        width={60}
        loop={clickTopButton}
        autoplay={clickTopButton}
        stop={!clickTopButton}
      />
    </S.TopButtonInner>
  );
};

const CopyButton = ({
  isCopyButton,
  toastMessage,
  handleCopyLink,
}: ICopyButtonProps) => {
  if (!isCopyButton) return <></>;
  return toastMessage ? (
    <S.TopButtonInner>
      <LottieWrapper
        animationData={ButtonLink}
        width={60}
        loop={false}
        autoplay={true}
      />
    </S.TopButtonInner>
  ) : (
    <BaseButton className="copy" onClick={handleCopyLink} />
  );
};

const Layout: React.FC<ILayoutProps> = (props: ILayoutProps) => {
  const { isHeader = true, isFooter = true, children, route } = props;

  const {
    toastMessage,
    handleTopEvent,
    handleCopyLink,
    clickTopButton,
    setClickTopButton,
  } = useLayout();

  const isMainPage = ['main', 'workDetail', 'newsDetail'].includes(route ?? '');
  const isNewsDetailPage = ['newsDetail'].includes(route ?? '');
  const isCopyButton = ['newsDetail'].includes(route ?? '');

  return (
    <S.LayoutWrapper>
      {isHeader ? (
        <GNB isMobile={props.isMobile} isTransparent={props.isTransparent} />
      ) : null}
      <S.LayoutContent
        isMainPage={isMainPage}
        isNewsDetailPage={isNewsDetailPage}
      >
        {children}
        {isMainPage && (
          <S.TopButtonWrapper isTransparent={props.isTransparent}>
            <CopyButton
              isCopyButton={isCopyButton}
              toastMessage={toastMessage}
              handleCopyLink={handleCopyLink}
            />
            <TopMenuButton
              clickTopButton={clickTopButton}
              handleTopEvent={handleTopEvent}
              setClickTopButton={setClickTopButton}
            />
          </S.TopButtonWrapper>
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

import { isEmpty } from 'lodash';
import React from 'react';
import BaseButton from '../BaseButton';
import Footer from '../Footer';
import GNB from '../GNB';
import useLayout from './Layout.hook';
import { ILayoutProps } from './Layout.interface';
import * as S from './Layout.style';
import { motion } from 'framer-motion';

const Layout: React.FC<ILayoutProps> = (props: ILayoutProps) => {
  const { isHeader = true, isFooter = true, children, route } = props;
  const { toastMessage, handleTopEvent, handleCopyLink } = useLayout();
  const isMainPage = ['main', 'workDetail'].includes(route ?? '');
  const isFloating = ['newsDetail'].includes(route ?? '');

  return (
    <S.LayoutWrapper>
      {isHeader ? (
        <GNB isMobile={props.isMobile} isTransparent={props.isTransparent} />
      ) : null}
      <S.LayoutContent isMainPage={isMainPage}>
        {children}
        <S.TopButtonWrapper isTransparent={props.isTransparent}>
          <BaseButton className="arrow-top" onClick={handleTopEvent} />
        </S.TopButtonWrapper>
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

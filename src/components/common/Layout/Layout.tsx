import React from 'react';
import Footer from '../Footer';
import GNB from '../GNB';
import { ILayoutProps } from './Layout.interface';
import * as S from './Layout.style';

const Layout: React.FC<ILayoutProps> = (props: ILayoutProps) => {
  const { isHeader = true, isFooter = true } = props;
  return (
    <S.LayoutWrapper>
      {isHeader ? <GNB /> : null}
      <S.LayoutContent>{props.children}</S.LayoutContent>
      {isFooter ? <Footer /> : null}
    </S.LayoutWrapper>
  );
};

export default Layout;

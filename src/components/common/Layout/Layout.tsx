import React from 'react';
import BaseButton from '../BaseButton';
import Footer from '../Footer';
import GNB from '../GNB';
import useLayout from './Layout.hook';
import { ILayoutProps } from './Layout.interface';
import * as S from './Layout.style';

const Layout: React.FC<ILayoutProps> = (props: ILayoutProps) => {
  const { isHeader = true, isFooter = true, children, route } = props;

  const { handleTopEvent } = useLayout();
  return (
    <S.LayoutWrapper>
      {isHeader ? <GNB /> : null}
      <S.LayoutContent>
        {children}

        {route === 'main' && (
          <S.TopButtonWrapper>
            <BaseButton className="arrow-top" onClick={handleTopEvent} />
          </S.TopButtonWrapper>
        )}
      </S.LayoutContent>
      {isFooter ? <Footer /> : null}
    </S.LayoutWrapper>
  );
};

export default Layout;

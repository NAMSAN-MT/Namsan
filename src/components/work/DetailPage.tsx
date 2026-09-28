import AppImage from '@Components/common/AppImage';
import BaseButton from '@Components/common/BaseButton';
import { BoxDivider } from '@Components/common/List/List.style';
import LottieWrapper from '@Components/common/LottieWrapper/LottieWrapper';
import MemberItem from '@Components/members/MemberItem';
import { withTranslations, WithIntlProps } from '@Hocs/withTranslations';
import { RemoteImage } from '@Interface/image.interface';
import React, { MouseEvent, useEffect, useState } from 'react';
import NavigationDown from '../../assets/lottie/navigation_down.json';
import NavigationUp from '../../assets/lottie/navigation_up.json';
import { CategoryDescription } from './work.interface';
import {
  Anchor,
  Box,
  ButtonWrapper,
  CategoryBox,
  Contents,
  Head,
  ImageContainer,
  ImageWrapper,
  Layout,
  LineArrowIconInner,
  MemberBox,
  MemberList,
  SubTitle,
  Title,
} from './work.styled';

export interface MiniMember {
  id: string;
  email: string;
  name: string;
  position: string;
  order: string;
  image: RemoteImage;
  bgImage: RemoteImage;
  businessFields: string[];
}

export interface Props extends WithIntlProps {
  id: string;
  language: 'ko' | 'en';
  subId: number;
  mainMemberData: MiniMember[];
  subMemberData: MiniMember[];
  workInfo: CategoryDescription[];
  backgroundImage?: RemoteImage;
}
const DetailPage = (props: Props) => {
  const { mainMemberData, subMemberData, workInfo, backgroundImage, intl } =
    props;
  const [category, setCategory] = useState<CategoryDescription[]>(workInfo);
  const [isShowMore, setIsShowMore] = useState(false);
  const subIdPrefix = props.id?.replace('C', 'S');

  // workInfo는 getStaticProps가 내려주는 locale별 데이터이고, category state는
  // 섹션 펼침/접힘 토글 때문에 필요하다. 그런데 정적 export의 클라이언트 라우팅은
  // /ko/work/C01 -> /en/work/C01 이동 시 같은 route(/[locale]/work/[id])라
  // 이 컴포넌트를 언마운트하지 않는다 → useState 초기값이 재평가되지 않아
  // 언어를 바꿔도 이전 언어의 본문이 그대로 남았다(GNB만 영문으로 바뀌는 증상).
  // locale/id가 바뀔 때마다 state를 새 props로 되돌린다.
  //
  // 해시 딥링크(#S0201 -> index 1)도 이 시점에 함께 적용한다. 렌더 바디에서
  // window.location.hash를 읽으면 서버('')와 클라이언트('#S0201')가 달라져
  // 하이드레이션 mismatch가 나므로, 반드시 mount 이후에만 읽는다.
  useEffect(() => {
    const idx = Number(window.location.hash.slice(-2));
    const openIndex = Number.isNaN(idx) || idx <= 0 ? -1 : idx;
    setCategory(
      workInfo.map((c, i) =>
        i === openIndex ? { ...c, isOpen: true } : { ...c },
      ),
    );
    // workInfo는 부모가 매 렌더 새로 만드는 배열이라 deps에 넣으면 무한 루프가 된다.
    // 내용이 실제로 바뀌는 시점은 locale/id 변경뿐이므로 그 둘만 추적한다.
  }, [props.language, props.id]);

  const onClickShowMore = () => {
    setIsShowMore(true);
  };

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    const { index } = e.currentTarget.dataset;

    setCategory(curr => {
      return curr.map((c, i) => {
        if (i === Number(index)) {
          return { ...c, isOpen: !c.isOpen ?? true, isFirstTime: false };
        }
        return c;
      });
    });
  };

  return (
    <Layout>
      <CategoryBox>
        {category?.map((item, index) => (
          <div key={index}>
            {index === 0 ? (
              <>
                <Title>{item.categoryTitle}</Title>
                <Contents>{item.description}</Contents>
                <ImageWrapper>
                  <ImageContainer>
                    {backgroundImage && (
                      <AppImage
                        src={backgroundImage.src}
                        width={backgroundImage.width}
                        height={backgroundImage.height}
                        alt="page-image"
                      />
                    )}
                  </ImageContainer>
                </ImageWrapper>
                <BoxDivider />
              </>
            ) : (
              <>
                <Box>
                  <Anchor
                    id={`${subIdPrefix}${String(index).padStart(2, '0')}`}
                  />
                  <Head onClick={handleClick} data-index={index}>
                    <SubTitle>{item.categoryTitle}</SubTitle>
                    <LineArrowIconInner>
                      <LottieWrapper
                        animationData={
                          item.isOpen
                            ? item.isFirstTime
                              ? { ...NavigationDown, fr: 0, op: 1 }
                              : NavigationUp
                            : item.isFirstTime
                            ? { ...NavigationUp, fr: 0, op: 1 }
                            : NavigationDown
                        }
                        width={21}
                        loop={false}
                      />
                    </LineArrowIconInner>
                  </Head>
                  {item.isOpen && <Contents>{item.description}</Contents>}
                </Box>
                <BoxDivider />
              </>
            )}
          </div>
        ))}
      </CategoryBox>
      <MemberBox>
        <SubTitle>{intl.formatMessage({ id: 'work.main_member' })}</SubTitle>
        <MemberList>
          {mainMemberData?.map(
            member =>
              member && (
                <MemberItem
                  key={member.id}
                  {...member}
                  businessFields={[]}
                  name={member.name?.toUpperCase() ?? ''}
                  order={`${member.order}`}
                />
              ),
          )}
        </MemberList>
      </MemberBox>

      {subMemberData?.length < 1 ? null : (
        <>
          {!isShowMore && (
            <ButtonWrapper>
              <BaseButton className="outline" onClick={onClickShowMore}>
                {intl.formatMessage({ id: 'work.show_more' })}
              </BaseButton>
            </ButtonWrapper>
          )}
          {isShowMore && (
            <MemberBox>
              <SubTitle>
                {intl.formatMessage({ id: 'work.sub_member' })}
              </SubTitle>
              <MemberList>
                {subMemberData?.map(
                  member =>
                    member && (
                      <MemberItem
                        key={member.id}
                        {...member}
                        businessFields={[]}
                        name={member.name?.toUpperCase() ?? ''}
                        order={`${member.order}`}
                      />
                    ),
                )}
              </MemberList>
            </MemberBox>
          )}
        </>
      )}
    </Layout>
  );
};

export default withTranslations(DetailPage);

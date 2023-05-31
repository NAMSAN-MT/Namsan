import BaseButton from '@Components/common/BaseButton';
import { BoxDivider } from '@Components/common/List/List.style';
import LottieWrapper from '@Components/common/LottieWrapper/LottieWrapper';
import MemberItem from '@Components/members/MemberItem';
import { PageContextProps } from '@Pages/work/[id]';
import { injectIntl } from 'gatsby-plugin-intl';
import React, { MouseEvent, useState } from 'react';
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
  Image,
  Layout,
  LineArrowIconInner,
  MemberBox,
  MemberList,
  SubTitle,
  Title,
} from './work.styled';

export interface Props {
  language: 'ko' | 'en';
  subId: number;
}
const DetailPage = (props: Props & PageContextProps) => {
  const { mainMemberData, subMemberData, workInfo, imagePath, intl } = props;
  const [category, setCategory] = useState<CategoryDescription[]>(workInfo);
  const [isShowMore, setIsShowMore] = useState(false);
  const subIdPrefix = props.id?.replace('C', 'S');

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
                <Image src={imagePath ?? ''}></Image>
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
                  name={member.name.toUpperCase()}
                  order={`${member.order}`}
                />
              ),
          )}
        </MemberList>
      </MemberBox>

      {!isShowMore && (
        <ButtonWrapper>
          <BaseButton className="outline" onClick={onClickShowMore}>
            {intl.formatMessage({ id: 'work.show_more' })}
          </BaseButton>
        </ButtonWrapper>
      )}
      {isShowMore && (
        <MemberBox>
          <SubTitle>{intl.formatMessage({ id: 'work.sub_member' })}</SubTitle>
          <MemberList>
            {subMemberData?.map(
              member =>
                member && (
                  <MemberItem
                    key={member.id}
                    {...member}
                    businessFields={[]}
                    order={`${member.order}`}
                  />
                ),
            )}
          </MemberList>
        </MemberBox>
      )}
    </Layout>
  );
};

export default injectIntl(DetailPage);

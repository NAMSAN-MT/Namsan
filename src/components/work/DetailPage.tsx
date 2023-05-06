import BaseButton from '@Components/common/BaseButton';
import LineArrowIcon from '@Components/icons/LineArrowIcon/LineArrowIcon';
import MemberItem from '@Components/members/MemberItem';
import { PageContextProps } from '@Pages/work/[id]';
import { injectIntl } from 'gatsby-plugin-intl';
import React, { MouseEvent, useState } from 'react';
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
          return { ...c, isOpen: !c.isOpen ?? true };
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
              </>
            ) : (
              <Box>
                <Anchor
                  id={`${subIdPrefix}${String(index).padStart(2, '0')}`}
                ></Anchor>
                <Head onClick={handleClick} data-index={index}>
                  <SubTitle>{item.categoryTitle}</SubTitle>
                  {/* TODO: SVG color 적용 */}
                  <LineArrowIcon
                    direction={item.isOpen ? 'UP' : 'DOWN'}
                    weight="BOLD"
                    width="21px"
                  ></LineArrowIcon>
                </Head>

                {item.isOpen && <Contents>{item.description}</Contents>}
              </Box>
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
                  email={''}
                  careers={[]}
                  key={member.id}
                  {...member}
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
                    email={''}
                    careers={[]}
                    key={member.id}
                    {...member}
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

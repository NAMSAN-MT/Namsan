import BaseButton from '@Components/common/BaseButton';
import LineArrowIcon from '@Components/icons/LineArrowIcon/LineArrowIcon';
import MemberItem from '@Components/members/MemberItem';
import { PageContextProps } from '@Pages/work/[id]';
import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import { CategoryDescription } from './work.interface';
import {
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
  id: string;
  lang?: string;

  language: 'ko' | 'en';
}

const DetailPage = ({
  id,
  lang,
  mainMemberData,
  subMemberData,
  workInfo,
}: Props & PageContextProps) => {
  const [category, setCategory] = useState<CategoryDescription[]>([]);
  const [isShowMore, setIsShowMore] = useState(false);
  const ip = useRef<string>('');

  useEffect(() => {
    ip.current = workInfo.imagePath;
    setCategory(
      workInfo.categoryInfo.map((name, index) => ({
        name,
        description: workInfo.description[index],
      })),
    );
  }, []);

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
        {category.map((item, index) => (
          <div key={index}>
            {index === 0 ? (
              <>
                <Title>{item.name}</Title>
                <Contents>{item.description}</Contents>
                <Image src={ip.current ?? ''}></Image>
              </>
            ) : (
              <Box>
                <Head onClick={handleClick} data-index={index}>
                  <SubTitle>{item.name}</SubTitle>
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
        <SubTitle>주요 구성원</SubTitle>
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
            구성원 더보기
          </BaseButton>
        </ButtonWrapper>
      )}
      {isShowMore && (
        <MemberBox>
          <SubTitle>관련 구성원</SubTitle>
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

export default DetailPage;

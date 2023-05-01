import { getWorkField } from '@Api/work.api';
import BaseButton from '@Components/common/BaseButton';
import LineArrowIcon from '@Components/icons/LineArrowIcon/LineArrowIcon';
import MemberItem from '@Components/members/MemberItem';
import { miniMember } from '@Pages/work/[id]';
import { IGatsbyImageData } from 'gatsby-plugin-image';
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
  mainMemberData: miniMember[];
  mainMemberImageData: IGatsbyImageData[];
  mainMemberBgImageData: IGatsbyImageData[];
  subMemberData: miniMember[];
  subMemberImageData: IGatsbyImageData[];
  subMemberBgImageData: IGatsbyImageData[];
}

const DetailPage = ({
  id,
  lang,
  mainMemberData,
  mainMemberImageData,
  mainMemberBgImageData,
  subMemberData,
  subMemberImageData,
  subMemberBgImageData,
}: Props) => {
  const [category, setCategory] = useState<
    (CategoryDescription & { isOpen?: boolean })[]
  >([]);
  const [memberList, setMemberList] = useState<miniMember[]>(mainMemberData);
  const [subMemberList, setSubMemberList] =
    useState<miniMember[]>(subMemberData);
  const [isShowMore, setIsShowMore] = useState(false);
  const ip = useRef<string>('');

  useEffect(() => {
    getWorkField(id, lang).then(data => {
      const { categoryInfo, description, member, imagePath } = data;
      ip.current = imagePath;
      const newData = categoryInfo.map((name, index) => ({
        name,
        description: description[index],
      }));
      setCategory(newData);

      setMemberList(
        mainMemberData.map((member, index) => ({
          ...member,
          image: mainMemberImageData[index],
          bgImage: mainMemberBgImageData[index],
        })),
      );
      setSubMemberList(
        subMemberList.map((member, index) => ({
          ...member,
          image: subMemberImageData[index],
          bgImage: subMemberBgImageData[index],
        })),
      );
    });
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
          {memberList.map(
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
            {subMemberList.map(
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

import { getWorkField } from '@Api/work.api';
import BaseButton from '@Components/common/BaseButton';
import LineArrowIcon from '@Components/icons/LineArrowIcon/LineArrowIcon';
import MemberItem from '@Components/members/MemberItem';
import { miniMember } from '@Pages/work/[id]';
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
  subMemberData: miniMember[];
}

const DetailPage = ({ id, lang, mainMemberData, subMemberData }: Props) => {
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

      // CHECK: 현재 제공된 업무분야 구성원 자료와, 구성원 businessField 내용이 상이함. 확인 필요.
      // getContainMember(categoryInfo[0]).then(memberList => {
      //   setMemberList(
      //     sortBy(memberList, ({ name }) => {
      //       const i = indexOf(member.main, name);
      //       return i < 0 ? member.main.length : i;
      //     }),
      //   );
      // });

      // getMemberByName(member.main).then(memberList => {
      //   setMemberList(
      //     sortBy(memberList, ({ name }) => {
      //       return indexOf(member.main, name);
      //     }),
      //   );
      // });
      // getMemberByName(member.sub).then(memberList => {
      //   setSubMemberList(
      //     sortBy(memberList, ({ name }) => {
      //       const i = indexOf(member.sub, name);
      //       return i < 0 ? member.sub.length : i;
      //     }),
      //   );
      // });
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
          {memberList.map(member => {
            return (
              <MemberItem key={member.id} {...member} image={member.image} />
            );
          })}
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
            {subMemberList.map(member => (
              <MemberItem key={member.id} {...member} />
            ))}
          </MemberList>
        </MemberBox>
      )}
    </Layout>
  );
};

export default DetailPage;

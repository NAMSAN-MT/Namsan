import { getMemberByName, getWorkField } from '@Api/work.api';
import BaseButton from '@Components/common/BaseButton';
import LineArrowIcon from '@Components/icons/LineArrowIcon/LineArrowIcon';
import MemberItem from '@Components/members/MemberItem';
import { IMember } from '@Interface/api.interface';
import { indexOf, sortBy } from 'lodash';
import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import { CategoryDescription } from './work.interface';
import {
  Box,
  Contents,
  Head,
  Layout,
  MemberBox,
  MemberList,
  SubTitle,
  Title,
  Image,
  ButtonWrapper,
  CategoryBox,
} from './work.styled';

export interface Props {
  id: string;
}

const DetailPage = ({ id }: Props) => {
  const [category, setCategory] = useState<
    (CategoryDescription & { isOpen?: boolean })[]
  >([]);
  const [memberList, setMemberList] = useState<IMember[]>([]);
  const [subMemberList, setSubMemberList] = useState<IMember[]>([]);
  const [isShowMore, setIsShowMore] = useState(false);
  const ip = useRef<string>('');

  useEffect(() => {
    getWorkField(id).then(data => {
      const { categoryInfo, description, member, imagePath } = data;
      ip.current = imagePath;
      setCategory([
        {
          categoryId: categoryInfo.categoryId,
          name: categoryInfo.name,
          description: description[0].val,
        },
        ...categoryInfo.subCategory.map((category, index) => ({
          ...category,
          description: description[index + 1].val,
        })),
      ]);

      getMemberByName(member.main).then(memberList => {
        setMemberList(
          sortBy(memberList, ({ name }) => {
            return indexOf(member.main, name);
          }),
        );
      });

      getMemberByName(member.sub).then(memberList => {
        setSubMemberList(
          sortBy(memberList, ({ name }) => {
            return indexOf(member.sub, name);
          }),
        );
      });
    });
  }, []);

  const onClickShowMore = () => {
    setIsShowMore(true);
  };

  const isMainCategory = ({ categoryId }: CategoryDescription) =>
    categoryId.startsWith('C');

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
            {isMainCategory(item) ? (
              <>
                <Title id={item.categoryId}>{item.name}</Title>
                <Contents>{item.description}</Contents>
                <Image src={ip.current ?? ''}></Image>
              </>
            ) : (
              <Box>
                <Head onClick={handleClick} data-index={index}>
                  <SubTitle id={item.categoryId}>{item.name}</SubTitle>
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
          {memberList.map(member => (
            <MemberItem
              key={member.id}
              name={member.name}
              position={member.position}
              businessFields={member.businessFields}
              image={member.image}
              id={member.id}
            />
          ))}
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
              <MemberItem
                key={member.id}
                name={member.name}
                position={member.position}
                businessFields={member.businessFields}
                image={member.image}
                id={member.id}
              />
            ))}
          </MemberList>
        </MemberBox>
      )}
    </Layout>
  );
};

export default DetailPage;

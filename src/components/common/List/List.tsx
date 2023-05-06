import React from 'react';
import {
  Wrapper,
  MainAnchor,
  HR,
  List,
  ListItem,
  Anchor,
  MainWrapper,
} from './List.style';
import { MainCategoryType, SubCategoryType } from './List.type';
import LineArrowIcon from '@Components/icons/LineArrowIcon/LineArrowIcon';

// TODO: 아이콘 추가 필요
export const MainCategory = ({
  id,
  name,
  children,
  language,
}: MainCategoryType) => {
  return (
    <Wrapper>
      <MainWrapper
        onClick={() => {
          location.href = `/${language ?? 'ko'}/work/${id}`;
        }}
      >
        <MainAnchor>{name}</MainAnchor>
        <LineArrowIcon direction="RIGHT" weight="BOLD" />
      </MainWrapper>
      <HR />
      <List>
        {children?.map(item => ({
          ...item,
          props: {
            ...item.props,
            sub_id: `/${language ?? 'ko'}/work/${id}#${item.props.sub_id}`,
          },
        }))}
      </List>
    </Wrapper>
  );
};

export const SubCategory = ({ name, sub_id }: SubCategoryType) => {
  return (
    <ListItem>
      <Anchor href={sub_id}>{name}</Anchor>
    </ListItem>
  );
};

export const LE = {
  MainCategory,
  SubCategory,
};

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
export const MainCategory = ({ id, name, children }: MainCategoryType) => {
  return (
    <Wrapper>
      <MainWrapper
        onClick={() => {
          location.href = `work/${id}`;
        }}
      >
        <MainAnchor>{name}</MainAnchor>
        <LineArrowIcon direction="RIGHT" weight="BOLD" />
      </MainWrapper>
      <HR />
      <List>
        {children?.map(item => ({
          ...item,
          props: { ...item.props, subId: `work/${id}#${item.props.subId}` },
        }))}
      </List>
    </Wrapper>
  );
};

export const SubCategory = ({ name, subId }: SubCategoryType) => {
  return (
    <ListItem>
      <Anchor href={subId}>{name}</Anchor>
    </ListItem>
  );
};

export const LE = {
  MainCategory,
  SubCategory,
};

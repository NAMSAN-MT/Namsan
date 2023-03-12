import { MembersSearchRequest, TMemberSearchField } from '../type/api.type';
import {
  EndPointType,
  GetDataList,
  GetDataListQuery,
  Parameter,
  TQuery,
} from './index.api';
import { Member } from '../interface/api.interface';

const getMemberPositionList = async (): Promise<string[]> => {
  const positionList = await GetDataList<unknown, TMemberSearchField>({
    endPoint: 'members',
    param: {},
    searchField: 'position',
  });
  return [...new Set(positionList)];
};

const getMemberBusinessFieldList = async (): Promise<string[]> => {
  const businessFieldsList = await GetDataList<unknown, TMemberSearchField>({
    endPoint: 'members',
    param: {},
    searchField: 'businessFields',
  });
  const businessFieldList = businessFieldsList.reduce<string[]>(
    (acc, list) => [...acc, ...list],
    [],
  );

  return [...new Set(businessFieldList)];
};

const getMembers = async (params: MembersSearchRequest) => {
  const endPoint: EndPointType = 'members';
  const conditions: TQuery[] = [
    {
      queryType: 'where',
      fieldPath: 'language',
      opStr: '==',
      value: params.language,
    },
    {
      queryType: 'where',
      fieldPath: 'name',
      opStr: '==',
      value: params.name,
    },
    {
      queryType: 'where',
      fieldPath: 'position',
      opStr: '==',
      value: params.position,
    },
    {
      queryType: 'where',
      fieldPath: 'businessFields',
      opStr: 'array-contains',
      value: params.businessField,
    },
    {
      queryType: 'orderby',
      fieldPath: 'id',
      directionStr: 'asc',
    },
  ];
  const param = { conditions };
  console.log(param);

  return await GetDataListQuery<Parameter, Member[]>({
    endPoint,
    param,
  });
};

export { getMembers, getMemberPositionList, getMemberBusinessFieldList };

import { IMember } from '../interface/api.interface';
import { EndPointType, TQuery } from '../type/api.type';
import { GetDataListQuery, getFileFromStorage } from './index.api';

const getMember = async (memberId: string) => {
  const endPoint: EndPointType = 'members';
  const queries: TQuery[] = [
    {
      queryType: 'where',
      fieldPath: 'id',
      opStr: '==',
      value: memberId,
    },
  ];

  const [member] = await GetDataListQuery<IMember>({
    endPoint,
    queries,
  });

  const memberWithImage = {
    ...member,
    imagePath: await getFileFromStorage(member.image),
    bgImagePath: await getFileFromStorage(member.bgImage),
  };

  return memberWithImage;
};

export { , getMember };

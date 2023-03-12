import { Api, Parameter } from '@Interface/api.interface';
import {
  EndPointType,
  QueryOrderByOptions,
  QueryWhereOptions,
} from '@Type/api.type';
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  QuerySnapshot,
  Timestamp,
} from 'firebase/firestore';
import { isEmpty } from 'lodash';
import { db } from './firebase';

export const GetData: Api = async ({ endPoint, param }) => {
  try {
    const docRef = doc(db, endPoint, param.id);
    const resultData = await getDoc(docRef);
    return resultData.exists()
      ? resultData.data()
      : new Error('Document does not exist');
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const GetDataList: Api = async <U, T extends { id: string }>({
  endPoint,
}: Parameter<U>) => {
  try {
    return snapshotAsArray<T>(await getDocs(collection(db, endPoint)));
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const GetDataListQuery: Api = async <
  U extends { conditions: QueryWhereOptions[]; orderBy?: QueryOrderByOptions },
>({
  endPoint,
  param,
}: Parameter<U>) => {
  try {
    const resultData = await getMultiWhereConditions(
      endPoint,
      param.conditions,
      param.orderBy,
    );

    return resultData.empty
      ? []
      : resultData.docs.map((doc: DocumentData) => doc.data());
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const GetDataListQueryOrderBy: Api = async <
  U extends QueryOrderByOptions,
>({
  endPoint,
  param,
}: Parameter<U>) => {
  try {
    const collectionRef = db.collection(endPoint);
    const resultData: any = [];
    return new Promise((resolve, reject) => {
      collectionRef
        .orderBy(param.fieldPath, param.directionStr)
        .limit(param.limit)

        .onSnapshot(docs => {
          docs.docs.forEach(doc => {
            resultData.push({
              id: doc.id,
              ...doc.data(),
              time: doc.data().time,
            });
          }),
            resolve(resultData);
        }),
        (error: unknown) => {
          reject(error);
        };
    });
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const Post: Api = async ({ endPoint, param }) => {
  try {
    await addDoc(collection(db, endPoint), param);
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const getTimestampToDate = (date: Timestamp): Date => date.toDate();

const snapshotAsArray = <T extends { id: string }>(snapshot: QuerySnapshot) =>
  snapshot.docs.map(doc => <T>{ ...doc.data(), id: doc.id });

const getMultiWhereConditions = async (
  endPoint: EndPointType,
  conditions: QueryWhereOptions[],
  orderBy?: QueryOrderByOptions,
) => {
  const ref = !isEmpty(orderBy)
    ? db
        .collection(endPoint)
        .orderBy(orderBy.fieldPath, orderBy.directionStr)
        .limit(orderBy.limit)
    : db.collection(endPoint);
  const resultRef = conditions.reduce(
    (acc: DocumentData, cur) => acc.where(cur.fieldPath, cur.opStr, cur.value),
    ref,
  );

  return await resultRef.get();
};

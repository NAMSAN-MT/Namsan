import { Api, IParameter, Parameter } from '@Interface/api.interface';
import {
  QueryWhereOptions,
  QueryOrderByOptions,
  EndPointType,
} from '@Type/api.type';
import firebase from 'firebase/compat/app';
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  FieldPath,
  getDoc,
  getDocs,
  QueryDocumentSnapshot,
  QuerySnapshot,
  setDoc,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';

// TODO: 삭제해야함
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

export const GetDataList = async <U>({
  endPoint,
  searchField,
}: Parameter<U>) => {
  try {
    const snapshot = await getDocs(collection(db, endPoint));
    return snapshot.docs.map(doc => getData(doc, searchField));
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
    let orderByRef: firebase.firestore.DocumentData = new Promise(
      (resolve, reject) => {
        collectionRef.orderBy(param.fieldPath, param.directionStr);

        if (param.limit) {
          orderByRef = orderByRef.limit(param.limit);
        }

        orderByRef.onSnapshot((docs: { docs: any[] }) => {
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
      },
    );
  } catch (e) {
    console.error(e);
    throw e;
  }
};

/*
  U: interface type of response array.
*/
export const GetDataListQuery = async <U>({
  endPoint,
  queries,
  searchFields,
}: IParameter) => {
  /* where 및 orderBy 분류 */
  const whereConditions: QueryWhereOptions[] = queries
    .filter(query => query.queryType === 'where')
    .map(query => query as QueryWhereOptions);
  const orderByConditions: QueryOrderByOptions[] = queries
    .filter(query => query.queryType === 'orderby')
    .map(query => query as QueryOrderByOptions);

  /* where 및 orderBy 이용해 collectionRef 생성 */
  const ref = db.collection(endPoint);
  const whereRef = getMultipleWhereQueries(ref, whereConditions);
  const orderByRef = getMultipleOrderByQueries(whereRef, orderByConditions);

  /* snapshot get */
  const snapshot = (await orderByRef.get()) as QuerySnapshot;
  return snapshot.docs.map(doc => getData<U>(doc, searchFields));
};

export const Post: Api = async ({ endPoint, param }) => {
  try {
    await addDoc(collection(db, endPoint), param);
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const PostWithId = async <T extends { [x: string]: any }>({
  endPoint,
  id,
  param,
}: {
  endPoint: EndPointType;
  id: string;
  param: T;
}) => {
  try {
    await setDoc(doc(db, endPoint, id), param);
  } catch (e) {
    console.error(e);
    throw e;
  }
};

/* utils */
export const getTimestampToDate = (date: Timestamp): Date => date.toDate();

const getData = <U>(doc: QueryDocumentSnapshot, fieldNames?: string[]) => {
  return (fieldNames ? doc.get(new FieldPath(...fieldNames)) : doc.data()) as U;
};

const getMultipleWhereQueries = (
  ref: firebase.firestore.DocumentData,
  conditions: QueryWhereOptions[],
  orderBy?: QueryOrderByOptions,
) => {
  return conditions.reduce<firebase.firestore.DocumentData>(
    (acc: DocumentData, cur) => {
      if (!cur.value) return acc;
      return acc.where(cur.fieldPath, cur.opStr, cur.value);
    },
    ref,
  );
};

const getMultipleOrderByQueries = (
  ref: firebase.firestore.DocumentData,
  conditions: QueryOrderByOptions[],
) => {
  return conditions.reduce<firebase.firestore.DocumentData>(
    (acc: DocumentData, cur) => {
      const orderByRef = acc.orderBy(cur.fieldPath, cur.directionStr);

      if (!cur.limit) return orderByRef;
      return orderByRef.limit(cur.limit);
    },
    ref,
  );
};

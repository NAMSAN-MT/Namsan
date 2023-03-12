import {
  addDoc,
  setDoc,
  collection,
  doc,
  DocumentData,
  FieldPath,
  getDoc,
  getDocs,
  OrderByDirection,
  QuerySnapshot,
  Timestamp,
  WhereFilterOp,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import { db } from './firebase';
import firebase from 'firebase/compat/app';

/* endpoint type */
export type EndPointType = 'news' | 'work' | 'profile' | 'members';

/* query parameter type */
export type QueryType = 'where' | 'orderby';

export type QueryWhereOptions = {
  fieldPath: string | FieldPath;
  opStr: WhereFilterOp;
  value: any;
};
export type QueryOrderByOptions = {
  fieldPath: string | FieldPath;
  directionStr?: OrderByDirection;
  limit?: number;
};

export type TQuery =
  | ({
      queryType: 'where';
    } & QueryWhereOptions)
  | ({ queryType: 'orderby' } & QueryOrderByOptions);

/**
 * @param endPoint (require) firebase collection name
 * @param param    (require) id: 'Document ID' firebase sequence value + etc...
 * @param searchField (optional) search specific field
 */
export interface Parameter<U = any, T = undefined> {
  endPoint: EndPointType;
  param: U;
  searchField?: T;
}

declare interface Api {
  <Request extends Parameter<Request>, Response>(
    param: Parameter,
  ): Promise<Response>;
  <Request extends Parameter<Request>, Response>(
    param: Parameter,
  ): Promise<Response>;
}

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

export const GetDataList = async <U, T>({
  endPoint,
  searchField,
}: Parameter<U, T>) => {
  try {
    const snapshot = await getDocs(collection(db, endPoint));
    return snapshot.docs.map(doc => getData(doc, searchField));
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const GetDataListQueryWhere: Api = async <
  U extends { conditions: QueryWhereOptions[] },
>({
  endPoint,
  param,
  searchField,
}: Parameter<U>) => {
  try {
    const ref = db.collection(endPoint);
    const resultData = (await getMultipleWhereQueries(
      ref,
      param.conditions,
    ).get()) as QuerySnapshot;

    return resultData.empty
      ? []
      : resultData.docs.map(doc => getData(doc, searchField));
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

        orderByRef.onSnapshot(docs => {
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

export const GetDataListQuery: Api = async <U>({
  endPoint,
  param,
  searchField,
}: Parameter<{ conditions: TQuery[] }>) => {
  const { conditions } = param;

  /* where 및 orderBy 분류 */
  const whereConditions: QueryWhereOptions[] = conditions
    .filter(condition => condition.queryType === 'where')
    .map(condition => condition as QueryWhereOptions);
  const orderByConditions: QueryOrderByOptions[] = conditions
    .filter(condition => condition.queryType === 'orderby')
    .map(condition => condition as QueryOrderByOptions);

  /* where 및 orderBy 이용해 collectionRef 생성 */
  const ref = db.collection(endPoint);
  const whereRef = getMultipleWhereQueries(ref, whereConditions);
  const orderByRef = getMultipleOrderByQueries(whereRef, orderByConditions);

  /* snapshot get */
  const snapshot = (await orderByRef.get()) as QuerySnapshot<U>;
  return snapshot.docs.map(doc => getData(doc, searchField));
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

const getData = <U, T>(doc: QueryDocumentSnapshot<U>, searchField?: T) => {
  return searchField ? doc.get(searchField as string) : doc.data();
};

const getMultipleWhereQueries = (
  ref: firebase.firestore.DocumentData,
  conditions: QueryWhereOptions[],
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
      return acc.orderBy(cur.fieldPath).limit(cur.limit);
    },
    ref,
  );
};

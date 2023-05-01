import { Api, IParameter } from '@Interface/api.interface';
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
  QueryDocumentSnapshot,
  QuerySnapshot,
  setDoc,
  Timestamp,
} from 'firebase/firestore';
import {
  getDownloadURL,
  listAll,
  ref,
  StorageReference,
} from 'firebase/storage';
import { db, storage } from './firebase';

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
const getData = <U>(doc: QueryDocumentSnapshot, fieldNames?: string[]) => {
  return (fieldNames ? doc.get(new FieldPath(...fieldNames)) : doc.data()) as U;
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
      return orderByRef.limit(cur.limit);
    },
    ref,
  );
};

export const getFilesFromStorage = async (storagePath: string) => {
  try {
    const fileRef = ref(storage, storagePath);
    const listFileRef = await listAll(fileRef);

    const downloadFiles = async (file: StorageReference) => {
      const fileUrl = await getDownloadURL(file);
      return fileUrl;
    };
    const fileList = await Promise.all(listFileRef.items.map(downloadFiles));
    return fileList;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const getFileFromStorage = async (storagePath: string) => {
  try {
    const fileRef = ref(storage, storagePath);
    const file = await getDownloadURL(fileRef);
    return file;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

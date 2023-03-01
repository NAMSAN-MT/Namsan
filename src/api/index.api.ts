import {
  addDoc,
  collection,
  doc,
  FieldPath,
  getDoc,
  getDocs,
  OrderByDirection,
  QuerySnapshot,
  Timestamp,
  WhereFilterOp,
} from 'firebase/firestore'
import { db } from './firebase'
export type EndPointType = 'news' | 'work' | 'profile'
export type QueryType = 'where' | 'orderby'
export type QueryWhereOptions = {
  queryType: 'where'
  fieldPath: string | FieldPath
  opStr: WhereFilterOp
  value: any
}
export type QueryOrderByOptions = {
  queryType: 'orderby'
  fieldPath: string | FieldPath
  directionStr?: OrderByDirection
  limit: number
}
/**
 * @param endPoint (require) firebase collection name
 * @param param    (require) id: 'Document ID' firebase sequence value + etc...
 */
export interface Parameter<T = any> {
  endPoint: EndPointType
  param: ((T & QueryWhereOptions) | QueryOrderByOptions) & { id: string }
}

declare interface Api {
  <Request extends Parameter<Request>, Response>(
    param: Parameter,
  ): Promise<Response>
  <Request extends Parameter<Request>, Response>(
    param: Parameter,
  ): Promise<Response>
}

export const GetData: Api = async ({ endPoint, param }) => {
  try {
    const docRef = doc(db, endPoint, param.id)
    const resultData = await getDoc(docRef)
    return resultData.exists()
      ? resultData.data()
      : new Error('Document does not exist')
  } catch (e) {
    console.error(e)
    throw e
  }
}

export const GetDataList: Api = async <U, T extends { id: string }>({
  endPoint,
}: Parameter<U>) => {
  try {
    return snapshotAsArray<T>(await getDocs(collection(db, endPoint)))
  } catch (e) {
    console.error(e)
    throw e
  }
}

export const GetDataListQueryWhere: Api = async <U>({
  endPoint,
  param,
}: Parameter<U>) => {
  try {
    if (param.queryType === 'where') {
      const citiesRef = db.collection(endPoint)
      const resultData = await citiesRef
        .where(param.fieldPath, param.opStr, param.value)
        .get()
      return resultData.empty
        ? new Error('No matching documents.')
        : resultData.docs.map(doc => doc.data())
    }
    throw new Error('### Not Found quertType is where')
  } catch (e) {
    console.error(e)
    throw e
  }
}

export const GetDataListQueryOrderBy: Api = async <U>({
  endPoint,
  param,
}: Parameter<U>) => {
  try {
    if (param.queryType === 'orderby') {
      const citiesRef = db.collection(endPoint)
      const resultData: any = []
      return new Promise((resolve, reject) => {
        citiesRef
          .orderBy(param.fieldPath, param.directionStr)
          .limit(param.limit)

          .onSnapshot(docs => {
            docs.docs.forEach(doc => {
              resultData.push({
                id: doc.id,
                ...doc.data(),
                time: doc.data().time,
              })
            }),
              resolve(resultData)
          }),
          (error: unknown) => {
            reject(error)
          }
      })
    }
    throw new Error('### Not Found quertType is orderby')
  } catch (e) {
    console.error(e)
    throw e
  }
}

export const Post: Api = async ({ endPoint, param }) => {
  try {
    await addDoc(collection(db, endPoint), param)
  } catch (e) {
    console.error(e)
    throw e
  }
}

export const getTimestampToDate = (date: Timestamp): Date => date.toDate()

const snapshotAsArray = <T extends { id: string }>(snapshot: QuerySnapshot) =>
  snapshot.docs.map(doc => <T>{ ...doc.data(), id: doc.id })

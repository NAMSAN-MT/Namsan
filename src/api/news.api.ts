import { Timestamp } from 'firebase/firestore'
import {
  getTimestampToDate,
  GetData,
  GetDataListQueryWhere,
  Parameter,
  QueryWhereOptions,
  QueryOrderByOptions,
  GetDataListQueryOrderBy,
} from './index.api'

interface News {
  title: string
  content: string
  date: Timestamp
  agency: string
  original_link: string
}

type NewsRequest = Partial<
  {
    id: string
    page: number
    offset: number
  } & (QueryWhereOptions | QueryOrderByOptions)
>

export const getNews = async (param: NewsRequest) => {
  return await GetData<Parameter, News>({ endPoint: 'news', param })
}

export const getNewsList = async (param?: NewsRequest) => {
  return await GetDataListQueryWhere<Parameter, News[]>({
    endPoint: 'news',
    param,
  }).then(getResultNewsList)
}

export const getMainNewsList = async () => {
  const param = {
    queryType: 'orderby',
    fieldPath: 'date',
    directionStr: 'asc',
    limit: 3,
  }

  return await GetDataListQueryOrderBy<Parameter, News[]>({
    endPoint: 'news',
    param,
  })
}

const getResultNewsList = (doc: News[]) =>
  doc.map(news => ({
    ...news,
    date: getTimestampToDate(news.date),
  }))

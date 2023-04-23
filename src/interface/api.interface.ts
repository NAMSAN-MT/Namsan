import { Timestamp } from 'firebase/firestore';
import { EndPointType, NewsType, TQuery } from '@Type/api.type';

export declare interface Api {
  <Request extends Parameter<Request>, Response>(
    param: Parameter,
  ): Promise<Response>;
  <Request extends Parameter<Request>, Response>(
    param: Parameter,
  ): Promise<Response>;
}

/**
 * @param endPoint (require) firebase collection name
 * @param param    (require) id: 'Document ID' firebase sequence value + etc...
 * @param searchFields (optional) search specific field: string[]
 */
export interface Parameter<U = any> {
  endPoint: EndPointType;
  param: U;
  searchField?: string[];
}

export interface IParameter {
  endPoint: EndPointType;
  queries: TQuery[];
  searchFields?: string[];
  fullTextSearch?: string;
}

export interface News {
  title: string;
  content: string;
  date: Timestamp;
  agency: string;
  originalLink: string;
  newsType: NewsType;
  dateYearMonth?: string;
}

export interface IMemberAttribute {
  value: string;
  time?: string;
}

export interface IMember {
  id: number;
  language: 'ko' | 'en';
  name: string;
  position: string;
  email: string;
  businessFields: string[];
  description?: string;
  educations?: IMemberAttribute[];
  careers: IMemberAttribute[];
  papers?: IMemberAttribute[];
  awards?: IMemberAttribute[];
  imagePath: string;
  bgImagePath: string;
}

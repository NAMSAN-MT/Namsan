import { Timestamp } from 'firebase/firestore';
import { EndPointType, NewsType } from '@Type/api.type';

/**
 * @param endPoint (require) firebase collection name
 * @param param    (require) id: 'Document ID' firebase sequence value + etc...
 */
export interface Parameter<T = any> {
  endPoint: EndPointType;
  param: T;
}

export declare interface Api {
  <Request extends Parameter<Request>, Response>(
    param: Parameter,
  ): Promise<Response>;
  <Request extends Parameter<Request>, Response>(
    param: Parameter,
  ): Promise<Response>;
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

export interface MemberAttribute {
  value: string;
  time?: string;
}

export interface Member {
  id: number;
  language: 'ko' | 'en';
  name: string;
  position: string;
  email: string;
  businessFields: string[];
  description?: string;
  educations?: MemberAttribute[];
  careers: MemberAttribute[];
  papers?: MemberAttribute[];
  awards?: MemberAttribute[];
  imagePath: string;
}

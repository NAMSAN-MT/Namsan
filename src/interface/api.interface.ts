import { Timestamp, documentId } from 'firebase/firestore';
import { EndPointType, NewsType, TQuery } from '@Type/api.type';
import { IGatsbyImageData } from 'gatsby-plugin-image';

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
  documentId?: string;
  title: string;
  content: string;
  summary: string;
  date: Timestamp;
  agency: string;
  originalLink: string;
  imagePath: string;
  newsType: NewsType;
  dateYearMonth?: string;
  dateYearMonthDate?: string;
}

export interface NewsMin {
  documentId?: string;
  title: string;
  summary: string;
  date: Timestamp;
  agency: string;
  newsType: NewsType;
  dateYearMonth: string;
}

export interface IMemberAttribute {
  value: string;
  time?: string;
}

export interface IMember {
  id: string;
  language: 'ko' | 'en';
  name: string;
  position: string;
  email: string;
  order: string;
  businessFields: string[];
  categoryIds: string[];
  description?: string;
  descriptionPreview?: string;
  educations?: IMemberAttribute[];
  careers: IMemberAttribute[];
  papers?: IMemberAttribute[];
  awards?: IMemberAttribute[];
  imagePath: string;
  bgImagePath: string;
  image: IGatsbyImageData;
  bgImage: IGatsbyImageData;
}

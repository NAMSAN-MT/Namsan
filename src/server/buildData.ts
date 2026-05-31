// src/server/buildData.ts
//
// Build-time data layer. Reuses the CLIENT Firebase SDK (src/api) to read the
// PUBLIC members / work / news collections from Firestore during the Next.js
// export build (getStaticPaths / getStaticProps). No firebase-admin / service
// account is needed: the same client config (NEXT_PUBLIC_FIREBASE_*) the browser
// already uses can read these collections under the project's public rules.
//
// SDK choice: reuses the existing compat client (src/api/index.api.ts
// GetDataListQuery + getFileFromStorage). The smoke test confirms compat reads
// Firestore in the Node build; if it had failed (WebChannel/transport), this
// module would have been switched to the modular SDK initialised from the same
// NEXT_PUBLIC_FIREBASE_* env. Compat worked, so we keep the single shared init.
//
// Import ONLY from getStaticPaths / getStaticProps — never from client
// components (it pulls the Firestore client into the server build only).
import { GetDataListQuery, getFileFromStorage } from '@Api/index.api';
import { IMemberAttribute } from '@Interface/api.interface';
import { Timestamp } from 'firebase/firestore';

/** Raw `members` collection document (Firestore fields only, no enrichment). */
export interface MemberDoc {
  documentId?: string;
  id: string;
  language: 'ko' | 'en';
  name: string;
  position: string;
  email: string;
  order: string;
  businessFields: string[];
  description?: string;
  descriptionPreview?: string;
  educations?: IMemberAttribute[];
  careers?: IMemberAttribute[];
  papers?: IMemberAttribute[];
  awards?: IMemberAttribute[];
  imagePath: string;
  bgImagePath: string;
}

/** Raw `work` collection document. */
export interface WorkDoc {
  documentId?: string;
  categoryId: string;
  categoryInfo: string[];
  description?: string[];
  imagePath?: string;
  language?: 'ko' | 'en';
  member?: { main: string[]; sub: string[] };
}

/** Raw `news` collection document. */
export interface NewsDoc {
  documentId?: string;
  id: string;
  newsType: string;
  originalLink?: string;
  imagePath?: string;
  title: string;
  date: Timestamp;
  content: string;
  agency: string;
  order: number;
  summary: string;
}

let _members: Promise<MemberDoc[]> | null = null;
let _work: Promise<WorkDoc[]> | null = null;
let _news: Promise<NewsDoc[]> | null = null;

/** members, ordered by `order` ascending (matches gatsby-node `allMembers(sort:{order:ASC})`). */
export const getAllMembers = (): Promise<MemberDoc[]> =>
  (_members ??= GetDataListQuery<MemberDoc>({
    endPoint: 'members',
    queries: [{ queryType: 'orderby', fieldPath: 'order', directionStr: 'asc' }],
  }));

/** work, ordered by `categoryId` ascending (matches gatsby-node `allWork(sort:{categoryId:ASC})`). */
export const getAllWork = (): Promise<WorkDoc[]> =>
  (_work ??= GetDataListQuery<WorkDoc>({
    endPoint: 'work',
    queries: [
      { queryType: 'orderby', fieldPath: 'categoryId', directionStr: 'asc' },
    ],
  }));

/**
 * news, ordered by `date` descending. gatsby-node read `allNews` with no
 * explicit sort (Gatsby's default for the `news` source) and built per-news
 * prev/next from the `order` field; news.api `getMainNewsList` orders by
 * `date` desc. We use `date` desc here so the build-time list matches the
 * runtime list the rest of the app already consumes.
 */
export const getAllNews = (): Promise<NewsDoc[]> =>
  (_news ??= GetDataListQuery<NewsDoc>({
    endPoint: 'news',
    queries: [{ queryType: 'orderby', fieldPath: 'date', directionStr: 'desc' }],
  }));

/**
 * Resolve a Storage path to a download URL string for `RemoteImage.src`.
 * Reuses the client `getFileFromStorage` (getDownloadURL). Empty path → ''.
 *
 * gatsby-node resolved images via an optional-chained GraphQL `file(...)` query
 * (`bgImage.data.file?.childImageSharp...`), so a missing source resolved to
 * `undefined` rather than throwing. Some member `bgImagePath` values (e.g. `bg2`,
 * `bg3`) have no Storage object; we mirror gatsby by swallowing not-found and
 * returning '' (components already guard empty/undefined images).
 */
export const imageUrl = async (path: string): Promise<string> => {
  if (!path) return '';
  try {
    return await getFileFromStorage(path);
  } catch (e: any) {
    if (e?.code === 'storage/object-not-found') return '';
    throw e;
  }
};

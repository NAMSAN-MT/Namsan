/* eslint-disable require-jsdoc */
// firebase-functions v6 의 v1 API. 기존 트리거 시맨틱
// (functions.region().https / .firestore.document().onCreate 등)을 그대로 유지하기 위해
// v2(onDocumentCreated 등)가 아닌 v1 API 엔트리포인트를 사용한다.
import * as functions from "firebase-functions/v1";
import * as admin from "firebase-admin";
import algoliasearch from "algoliasearch";
import * as Helper from "./helper";
import { DocumentData } from "firebase-admin/firestore";

// 주의: 아래 GATSBY_FIREBASE_* 값들은 이 functions 패키지 전용 .env(functions/.env)에서
// 로드된다. 웹 앱(NEXT_PUBLIC_*)과는 독립적인 별개의 환경변수다.
const firebaseConfig = {
  apiKey: process.env.GATSBY_FIREBASE_API_KEY,
  authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
  storageBucket: process.env.GATSBY_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.GATSBY_FIREBASE_APP_ID,
  measureId: process.env.GATSBY_FIREBASE_MEASUREMENT_ID,
};

admin.initializeApp(firebaseConfig);
const firestore = admin.firestore();
// Set up Aloglia
// functions.config() 런타임 설정 API 는 firebase-functions v6 에서 제거/중단되었으므로
// Algolia 자격증명을 process.env 로 읽는다. firebase-functions 가 배포/런타임 시
// functions/.env 파일을 자동으로 process.env 에 로드한다.
const ALGOLIA_APPID = process.env.ALGOLIA_APPID;
const ALGOLIA_APIKEY = process.env.ALGOLIA_APIKEY;

if (!ALGOLIA_APPID || !ALGOLIA_APIKEY) {
  throw new Error(
    "Missing Algolia credentials. Set ALGOLIA_APPID and ALGOLIA_APIKEY " +
      "in functions/.env",
  );
}

const algoliaClient = algoliasearch(ALGOLIA_APPID, ALGOLIA_APIKEY);

const INDEX_NAME = "dev_namsan";
const REGION = "asia-northeast2";

const COLLECTION_INDEX = algoliaClient.initIndex(INDEX_NAME);

// 데이터 모델 클래스 생성
class MyData {
  constructor(public data: any, public id: string) {}
}

// Firestore 데이터 모델 클래스에 id 속성 추가
const myDataConverter = {
  toFirestore(data: MyData): DocumentData {
    return data;
  },
  fromFirestore(snapshot: any, options: any): MyData {
    const data = snapshot.data(options);
    return new MyData(data, snapshot.id);
  },
};

export const helloWorld = functions
  .region(REGION)
  .https.onRequest(async (request, response) => {
    console.log("## Request ## >>> ");
    try {
      const collectionRef = firestore.collection("news");
      const list: any[] = [];
      // 해당 컬렉션에 있는 모든 문서들 가져오기
      await new Promise((resolve, reject) => {
        collectionRef
          .withConverter(myDataConverter as any)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              const document = doc.data().data;
              const content = Helper.minifyBytes(document.content);

              list.push({
                documentId: doc.data().id,
                title: document.title,
                content,
                newsType: document.newsType,
                order: document.order ?? 0,
              });
            });
            resolve(list);
          })
          .catch(error => {
            console.log("Error getting documents: ", error);
          });
      });

      // After all records are created, save them to Algolia
      await COLLECTION_INDEX.saveObjects(list, {
        autoGenerateObjectIDIfNotExist: true,
      })
        .then(() => {
          response.send("SUCCESS");
        })
        .catch(res => console.log("Error with: ", res));
    } catch (error) {
      console.log(error);
    }
    console.log("#### end #### ");
  });

// define functions:collectionOnCreate
export const collectionOnCreate = functions
  .region(REGION)
  .firestore.document("news/{newsId}")
  .onCreate(async (snapshot: any, context: any) => {
    await saveDocumentInAlgolia(snapshot, context);
  });

const saveDocumentInAlgolia = async (sanpshot: any, context: any) => {
  if (sanpshot.exists) {
    const data = sanpshot.data();
    if (data) {
      const content = Helper.minifyBytes(data.content);
      const list = [];
      list.push({
        documentId: context.params.newsId,
        title: data.title,
        content,
        newsType: data.newsType,
        order: data.order,
      });

      COLLECTION_INDEX.saveObjects(list, {
        autoGenerateObjectIDIfNotExist: true,
      }).then(({objectIDs}) => {
        const collectionRef = firestore.collection("news");
        const documentId = context.params.newsId
        const objectID = objectIDs?.[0] ?? 0
        collectionRef.doc(documentId).set({objectID}, { merge: true });
        console.log(`Set Algolia objectID:${objectID} and DoucmentId:${documentId}`)
      }).catch(res => console.log("Error with: ", res));
    }
  }
};

// define functions:collectionOnUpdate
/**
 *
  @description saveObject(record): record에 있는 정보로 기존 정보를 전부 덮어쓰.기
  @description partialUpdateObjects(record): record에 넣어준 정보만 새로 저장.
 */
export const collectionOnUpdate = functions
  .region(REGION)
  .firestore.document("news/{newsId}")
  .onUpdate(async (change: any, context: any) => {
    await updateDocumentInAlgolia(context.params.newsId, change);
  });

type NewObjectType = {
  documentId: any;
  title?: string;
  content?: string;
  order?: boolean;
};
const updateDocumentInAlgolia = async (documentId: any = "", change: any) => {
  const before = change.before.data();
  const after = change.after.data();
  if (before && after) {
    const news: NewObjectType = { documentId };
    let flag = false;
    if (before.title !== after.title) {
      news.title = after.title;
      flag = true;
    }

    if (before.content !== after.content) {
      news.content = after.content;
      flag = true;
    }

    if (before.order !== after.order) {
      news.order = after.order;
      flag = true;
    }

    if (flag) {
      COLLECTION_INDEX.partialUpdateObjects([news], {
        createIfNotExists: true,
      }).catch(res => console.log("Error with: ", res));
    }
  }
};

// define functions:collectionOnDelete
export const collectionOnDelete = functions
  .region(REGION)
  .firestore.document("news/{newsId}")
  .onDelete(async (snapshot: any, context: any) => {
    await deleteDocumentInAlgolia(snapshot, context);
  });

const deleteDocumentInAlgolia = async (sanpshot: any, context: any) => {
  if (sanpshot.exists) {
    const objectId = sanpshot.data();
    COLLECTION_INDEX.deleteObject(objectId).catch(res =>
      console.log("Error with: ", res),
    );
  }
};

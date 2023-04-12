import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import algoliasearch from "algoliasearch";
import * as Helper from "./helper";
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount as ServiceAccount),
//   databaseURL: process.env.REACT_APP_DATABASE_URL,
// });

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

const algoliaClient = algoliasearch(
  functions.config().algolia.appid,
  functions.config().algolia.apikey,
);

const INDEX_NAME = "dev_namsan";
const REGION = "asia-northeast2";
const COLLECTION_INDEX = algoliaClient.initIndex(INDEX_NAME);

export const helloWorld = functions
  .region(REGION)
  .https.onRequest(async (request, response) => {
    console.log("## Request ## >>> ");
    const algoliaCollection: any[] = [];
    const snapshot = await firestore.collection("news").listDocuments();

    await new Promise((resolve, reject) => {
      snapshot.forEach(async (doc: any) => {
        const document = (await doc.get()).data();
        const contentRecordList = Helper.cutStringTo1000Bytes(document.content);
        const content = Helper.contentReduce(contentRecordList);

        algoliaCollection.push({
          title: document.title,
          ...content,
        });

        resolve(algoliaCollection);
      }),
      (error: unknown) => {
        reject(error);
      };
    });

    // After all records are created, save them to Algolia
    COLLECTION_INDEX.saveObjects(algoliaCollection, {
      autoGenerateObjectIDIfNotExist: true,
    }).catch((res) => console.log("Error with: ", res));
  });

// define functions:collectionOnCreate
export const collectionOnCreate = functions
  .region(REGION)
  .firestore.document("news/{newsId}")
  .onCreate(async (snapshot: any, context: any) => {
    await saveDocumentInAlgolia(snapshot);
  });

const saveDocumentInAlgolia = async (sanpshot: any) => {
  if (sanpshot.exists) {
    const data = sanpshot.data();
    if (data) {
      const contentRecordList = Helper.cutStringTo1000Bytes(data.content);
      const content = Helper.contentReduce(contentRecordList);

      const collectionDoc = {
        title: data.title,
        ...content,
      };

      COLLECTION_INDEX.saveObjects([collectionDoc], {
        autoGenerateObjectIDIfNotExist: true,
      }).catch((res) => console.log("Error with: ", res));
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

type NewObjectType = { objectId: any; title?: string; content?: string };
const updateDocumentInAlgolia = async (objectID: any, change: any) => {
  const before = change.before.data();
  const after = change.after.data();
  if (before && after) {
    const news: NewObjectType = {objectId: objectID};
    let flag = false;
    if (before.title !== after.title) {
      news.title = after.title;
      flag = true;
    }

    if (before.content !== after.content) {
      news.content = after.content;
      flag = true;
    }

    if (flag) {
      COLLECTION_INDEX.partialUpdateObjects([news], {
        autoGenerateObjectIDIfNotExist: true,
      }).catch((res) => console.log("Error with: ", res));
    }
  }
};

// define functions:collectionOnDelete
export const collectionOnDelete = functions
  .region(REGION)
  .firestore.document("news/{newsId}")
  .onDelete(async (snapshot: any, context: any) => {
    await deleteDocumentInAlgolia(snapshot);
  });

const deleteDocumentInAlgolia = async (sanpshot: any) => {
  if (sanpshot.exists) {
    const objectId = sanpshot.data();
    COLLECTION_INDEX.deleteObject(objectId).catch((res) =>
      console.log("Error with: ", res),
    );
  }
};

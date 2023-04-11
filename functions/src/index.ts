import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import algoliasearch from "algoliasearch";
import {TextEncoder, TextDecoder} from "util";

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

const cutStringTo1000Bytes = (myString: string) => {
  const encoder = new TextEncoder();
  // eslint-disable-next-line
  const specialTypeReg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"”“‘’·…]/gi;
  const str = myString.replace(specialTypeReg, "").replace(/\s/g, "");
  const bytes = encoder.encode(str);

  if (bytes.length <= 1000) {
    return [str];
  }

  const numChunks = Math.ceil(bytes.length / 1000);
  const truncatedStrings = [];

  for (let i = 0; i < numChunks; i++) {
    const start = i * 1000;
    const end = start + 1000;
    const truncatedBytes = bytes.slice(start, end);
    const decoder = new TextDecoder();
    const truncatedString = decoder.decode(truncatedBytes);
    truncatedStrings.push(truncatedString);
  }

  return truncatedStrings;
};

export const helloWorld = functions
  .region(REGION)
  .https.onRequest(async (request, response) => {
    console.log("## Request ## >>> ");
    const algoliaCollection: any[] = [];
    const snapshot = await firestore.collection("news").listDocuments();

    await new Promise(
      (resolve, reject) => {
        snapshot.forEach(async ( doc: any
        ) => {
          const document = (await doc.get()).data();
          const contentRecordList = cutStringTo1000Bytes(document.content);
          const content = contentRecordList.reduce((acc, cur, index) => {
            return {...acc, [`content${index + 1}`]: cur};
          }, {});

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
    COLLECTION_INDEX.saveObjects(
      algoliaCollection,
      {autoGenerateObjectIDIfNotExist: true},
    );
  });

//  export const helloWorld = functions
//   .region(REGION)
//   .https.onRequest(async (request, response) => {
//     console.log("## Request ## >>> ", request);
//     const firestore = admin.firestore();
//     // const algoliaCollection: any[] = [];

//     const snapshot = await firestore.collection("news").listDocuments();
//     snapshot.forEach((doc: any) => {
//       const document = doc.data();
//       const collectionDoc = {
//         // objectId: doc.id,
//         collectionId: doc.id,
//         title: document.title,
//         content: document.content,
//         test: document.toString(),
//       };
//       // algoliaCollection.push(collectionDoc);
//       // firestore.collection("news").doc().set(collectionDoc);

//       firestore
//         .collection("news")
//         .doc()
//         .set(collectionDoc)
//         .then(function(docRef) {
//           console.log("Document written");
//         })
//         .catch(function(error) {
//           console.error("Error adding document: ", error);
//         });
//     });

//     // // After all records are created, save them to Algolia
//     // COLLECTION_INDEX.saveObjects(
//     //   algoliaCollection,
//     //   (err: any, content: any) => {
//     //     if (err) console.error("### [ERROR] ### ", err);
//     //     if (content) console.log("@@@ [CONTENT] @@@ ", content);

//     //     response
//     //       .status(200)
//     //       .send("COLLECTION was indexed to Algolia successfully.");
//     //   },
//     // );
//   });

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
      const collectionDoc = {
        title: data.title,
        content: data.content,
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

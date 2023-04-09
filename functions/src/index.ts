import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import algoliasearch from "algoliasearch";

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
// //
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// Set up Aloglia

const algoliaClient = algoliasearch(
  functions.config().algolia.appid,
  functions.config().algolia.apikey
);

const INDEX_NAME = "dev_namsan";
const REGION = "asia-northeast2";
const COLLECTION_INDEX = algoliaClient.initIndex(INDEX_NAME);

export const helloWorld = functions
  .region(REGION)
  .https.onRequest(async (request, response) => {
    console.log("## Request ## >>> ", request);
    const firestore = admin.firestore();
    const algoliaCollection: any[] = [];
    const snapshot = await firestore.collection("news").listDocuments();
    snapshot.forEach((doc:any) => {
      const document = doc.data();
      const collectionDoc = {
        objectId: doc.id,
        title: document.title,
        content: document.content,
      };
      algoliaCollection.push(collectionDoc);
    });

    // After all records are created, save them to Algolia
    COLLECTION_INDEX.saveObjects(algoliaCollection, (err:any, content:any) => {
      if (err) console.error("### [ERROR] ### ", err);
      if (content) console.log("@@@ [CONTENT] @@@ ", content);

      response.status(200)
        .send("COLLECTION was indexed to Algolia successfully.");
    });
  });


// define functions:collectionOnCreate
export const collectionOnCreate =
  functions
    .region(REGION)
    .firestore.document("news/{newsId}")
    .onCreate(async (snapshot:any, context:any) => {
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

      COLLECTION_INDEX
        .saveObjects([collectionDoc], {autoGenerateObjectIDIfNotExist: true}, )
        .catch((res) => console.log("Error with: ", res));
    }
  }
};

// define functions:collectionOnUpdate
/**
 *
  @description saveObject(record): record에 있는 정보로 기존 정보를 전부 덮어쓰.기
  @description partialUpdateObjects(record): record에 넣어준 정보만 새로 저장.
 */
export const collectionOnUpdate =
  functions
    .region(REGION)
    .firestore.document("news/{newsId}")
    .onUpdate(async (change:any, context:any) => {
      await updateDocumentInAlgolia(context.params.newsId, change);
    });

type NewObjectType ={objectId: any, title?: string, content?: string}
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
      COLLECTION_INDEX
        .partialUpdateObjects([news], {autoGenerateObjectIDIfNotExist: true})
        .catch((res) => console.log("Error with: ", res));
    }
  }
};


// define functions:collectionOnDelete
export const collectionOnDelete =
  functions
    .region(REGION)
    .firestore.document("news/{newsId}")
    .onDelete(async (snapshot:any, context:any) => {
      await deleteDocumentInAlgolia(snapshot);
    });

const deleteDocumentInAlgolia = async (sanpshot: any) => {
  if (sanpshot.exists) {
    const objectId = sanpshot.data();
    COLLECTION_INDEX.deleteObject(objectId)
      .catch((res) => console.log("Error with: ", res));
  }
};

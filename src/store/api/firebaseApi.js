import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { firebaseConfig } from "../../utils/config";
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export function storeChat(convo, itemId) {
  itemId && db.ref().child(`doorpicker/${itemId}`).set(convo);
}

export async function getChat(postId, cb) {
  //let document = await document.ref();
  const dchats = collection(db, "doorpicker", postId);
  const dSnapshot = await getDocs(dchats);
  const dList = dSnapshot.docs.map((doc) => doc.data());
  console.log(dList, " from firebase");
  cb(dList);
}

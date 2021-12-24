import { getDoc, doc, setDoc } from "firebase/firestore";
import db from "../../utils/config";
import { uniqueId } from "lodash";

export async function storeChat(convo, itemId) {
  const cityRef = doc(db, "doorpicker", itemId.toString());
  setDoc(cityRef, convo);
}

export async function getChat(postId = "lO8NC4IaphyRTh7tNUun", cb) {
  const docRef = doc(db, "doorpicker", postId.toString());
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    cb(docSnap.data());
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
}
export async function addTwo() {
  const d = new Date();
  await setDoc(doc(db, "doorpicker", "5"), {
    msgs: [
      {
        createdAt: new Date(d.getTime() - 24 * 60 * 60 * 1000),
        id: uniqueId("5-"),
        text: "yes it is available",
        user: {
          _id: 2,
          id: 2,
          name: "admin",
        },
      },
      {
        createdAt: d,
        id: uniqueId("5-"),
        text: "ok, how much",
        user: {
          _id: 1,
          id: 1,
          name: "yolo",
        },
      },
    ],
  });
}

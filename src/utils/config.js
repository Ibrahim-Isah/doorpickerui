import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import "firebase/firestore";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREKEY,
  authDomain: `${process.env.REACT_APP_FIRE_APP}.firebaseio.com`,
  databaseURL: `https://${process.env.REACT_APP_FIRE_APP}.firebaseio.com`,
  projectId: process.env.REACT_APP_FIRE_APP,
  storageBucket: `${process.env.REACT_APP_FIRE_APP}.appspot.com`,
  messagingSenderId: "DoorPicker",
};
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
export default db;

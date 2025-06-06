import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB9-ozSXXXIZOuno72RMD24IO6w0CHGdQA",
  authDomain: "chatmatchpet.firebaseapp.com",
  databaseURL: "https://chatmatchpet-default-rtdb.firebaseio.com",
  projectId: "chatmatchpet",
  storageBucket: "chatmatchpet.firebasestorage.com",
  messagingSenderId: "176080576812",
  appId: "1:176080576812:web:e1daa710cdec0c16c94c89"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

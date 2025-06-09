// lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD7zbj3yKQtpG_dlCRSWZKpRjnf09tmFA0", // ← ¡con I mayúscula!
  authDomain: "maychpet.firebaseapp.com",
  projectId: "maychpet",
  storageBucket: "maychpet.appspot.com",
  messagingSenderId: "819051628508",
  appId: "1:819051628508:web:8e3ef7aa67415e8a6cb119"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDkqkoiJohNtZlPMRVqwBTbttAK7Kee4zo",
  authDomain: "pepshop-8cc16.firebaseapp.com",
  projectId: "pepshop-8cc16",
  storageBucket: "pepshop-8cc16.appspot.com",
  messagingSenderId: "580462653305",
  appId: "1:580462653305:web:1e1dc6f1392fbddb6349a8",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };

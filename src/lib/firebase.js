import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC6G8XCKC0pdgntS7f0lXP1UI5-gNymlYk",
  authDomain: "findocs-622a4.firebaseapp.com",
  projectId: "findocs-622a4",
  storageBucket: "findocs-622a4.firebasestorage.app",
  messagingSenderId: "1048750641622",
  appId: "1:1048750641622:web:b95ae68bb37833c67c1477",
  measurementId: "G-CXP2PNN3Z8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const realDb = getDatabase(app);
const storage = getStorage(app);

export { app, auth, db, realDb, storage };
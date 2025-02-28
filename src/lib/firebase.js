import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBgH-VFgvqb83rJdT9g6Me1wBdhF2HerhI",
  authDomain: "findocs-ai-db.firebaseapp.com",
  projectId: "findocs-ai-db",
  storageBucket: "findocs-ai-db.firebasestorage.app",
  messagingSenderId: "1016592088854",
  appId: "1:1016592088854:web:46db6eaadcf8a590ad5a37"
};

const firebaseConfig2 = {
  apiKey: "AIzaSyC6G8XCKC0pdgntS7f0lXP1UI5-gNymlYk",
  authDomain: "findocs-622a4.firebaseapp.com",
  projectId: "findocs-622a4",
  storageBucket: "findocs-622a4.firebasestorage.app",
  messagingSenderId: "1048750641622",
  appId: "1:1048750641622:web:b95ae68bb37833c67c1477",
  measurementId: "G-CXP2PNN3Z8"
};

const app = initializeApp(firebaseConfig, 'mainApp');
const auth = getAuth(app);
const db = getFirestore(app);
const realDb = getDatabase(app);

const storageApp = initializeApp(firebaseConfig2, 'storageApp');
const storage = getStorage(storageApp);

export { app, auth, db, realDb, storage };
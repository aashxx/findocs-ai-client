import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBgH-VFgvqb83rJdT9g6Me1wBdhF2HerhI",
  authDomain: "findocs-ai-db.firebaseapp.com",
  projectId: "findocs-ai-db",
  storageBucket: "findocs-ai-db.firebasestorage.app",
  messagingSenderId: "1016592088854",
  appId: "1:1016592088854:web:46db6eaadcf8a590ad5a37"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const realDb = getDatabase(app);

export { app, auth, db, realDb };
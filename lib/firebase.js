// lib/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// const firebaseConfig = {
//   apiKey: "AIzaSyDkWs-v7oxzQj08RSQJ-CwAyLm2gByrteQ",
//   authDomain: "zimlowprice.firebaseapp.com",
//   databaseURL: "https://zimlowprice-default-rtdb.firebaseio.com",
//   projectId: "zimlowprice",
//   storageBucket: "zimlowprice.firebasestorage.app",
//   messagingSenderId: "37088506346",
//   appId: "1:37088506346:web:7f5845e6c46d68a9c4c293",
//   measurementId: "G-ZVKH7Q7X70",
// };

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };

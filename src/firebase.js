import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDa5t6Pkr4_9CmVwvHmHnPGBsUrpq-E5QI",
  authDomain: "chat-app-b507c.firebaseapp.com",
  projectId: "chat-app-b507c",
  storageBucket: "chatapp-37de1.appspot.com",
  messagingSenderId: "459286852833",
  appId: "1:459286852833:web:594b3c1cb3c425e77eb3a0",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
console.log(db);

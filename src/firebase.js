import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCa4Oj2cvmQ5WtACuFhMcfaHC876LLTotI",
  authDomain: "chat-d9667.firebaseapp.com",
  projectId: "chat-d9667",
  storageBucket: "chat-d9667.appspot.com",
  messagingSenderId: "185335052043",
  appId: "1:185335052043:web:9d3d3e8646064d7128140e",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();

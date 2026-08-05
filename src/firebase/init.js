import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCNzyDulQ-OI925fpouUF0-pfnf1tzW5PI",
  authDomain: "fir-practice-a7ae2.firebaseapp.com",
  projectId: "fir-practice-a7ae2",
  storageBucket: "fir-practice-a7ae2.firebasestorage.app",
  messagingSenderId: "938134766754",
  appId: "1:938134766754:web:ced3ac5a413dd36c7f03fb"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
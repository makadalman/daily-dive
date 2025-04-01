import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"

const config = {
  apiKey: "AIzaSyCx3M-JGCStb2ziez3xBhCB-BChvh-b0jc",
  authDomain: "daily-dive-e4421.firebaseapp.com",
  projectId: "daily-dive-e4421",
  storageBucket: "daily-dive-e4421.firebasestorage.app",
  messagingSenderId: "210796531181",
  appId: "1:210796531181:web:d225a6544594c8e75babe4",
  measurementId: "G-SS03NR2PJK"
};

const app = initializeApp(config);
export const db = getFirestore(app);
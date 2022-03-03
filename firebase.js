import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCdybihrDwUfbiXoyIonAhwtKdSH85FKiQ",
  authDomain: "instagram-clone-4f279.firebaseapp.com",
  projectId: "instagram-clone-4f279",
  storageBucket: "instagram-clone-4f279.appspot.com",
  messagingSenderId: "677431127957",
  appId: "1:677431127957:web:45d8ca762c53d6fada109c"
};


export const app = initializeApp(firebaseConfig);
export const db = getFirestore();

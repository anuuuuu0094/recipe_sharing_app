
import { initializeApp } from "firebase/app";
import { getAuth , GoogleAuthProvider } from "firebase/auth";
import {getFirestore } from 'firebase/firestore'
 
const firebaseConfig = {
  apiKey: "AIzaSyCIxLcSJt5UilP8GxB8PXvGa6QDJcC-1OU",
  authDomain: "recipesharing-11fc6.firebaseapp.com",
  databaseURL: "https://recipesharing-11fc6-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "recipesharing-11fc6",
  storageBucket: "recipesharing-11fc6.firebasestorage.app",
  messagingSenderId: "519444676470",
  appId: "1:519444676470:web:216987263beb2b49758457",
  measurementId: "G-KCSE5RMD2J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
// export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)
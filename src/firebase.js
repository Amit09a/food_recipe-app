// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ✅ Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDE7vFOJ9cbvyS3RJNPmRy-x9bT40D4c-4",
  authDomain: "food-recipe-9e15b.firebaseapp.com",
  databaseURL: "https://food-recipe-9e15b-default-rtdb.firebaseio.com",
  projectId: "food-recipe-9e15b",
  storageBucket: "food-recipe-9e15b.appspot.com", 
  messagingSenderId: "136955915560",
  appId: "1:136955915560:web:0e3eb1b0c15133efdaf41d",
  measurementId: "G-4WM9YK0DXG"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export Auth and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);

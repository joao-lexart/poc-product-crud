// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD26t9tuSRd8nkzCfYaYDcccOUXMybbDeE",
  authDomain: "poc-crud-dd75e.firebaseapp.com",
  projectId: "poc-crud-dd75e",
  storageBucket: "poc-crud-dd75e.appspot.com",
  messagingSenderId: "74729644971",
  appId: "1:74729644971:web:07a60410d131a9bfece8ee"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYkc8hf5wNerQW5i6-CM9mV-nO2gL81lw",
  authDomain: "cmj-buggy.firebaseapp.com",
  databaseURL: "https://cmj-buggy-default-rtdb.firebaseio.com",
  projectId: "cmj-buggy",
  storageBucket: "cmj-buggy.appspot.com",
  messagingSenderId: "865116826065",
  appId: "1:865116826065:web:cd341af769af76fa0418f0",
  measurementId: "G-TNMXNJXXT5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
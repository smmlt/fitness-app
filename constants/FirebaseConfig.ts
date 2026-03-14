// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgV9Suxm8wmXBI6rEPAHKUQTft1WCZ08w",
  authDomain: "fitness-app-52c2e.firebaseapp.com",
  projectId: "fitness-app-52c2e",
  storageBucket: "fitness-app-52c2e.firebasestorage.app",
  messagingSenderId: "158279989811",
  appId: "1:158279989811:web:8d4f356b4e3fe86a310146"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
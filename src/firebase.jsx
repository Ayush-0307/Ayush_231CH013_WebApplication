// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD8gc2RiGYCnibbhAKv3XSYQ_w0eZuromo",
    authDomain: "fintrack-7ba4b.firebaseapp.com",
    projectId: "fintrack-7ba4b",
    storageBucket: "fintrack-7ba4b.appspot.com",
    messagingSenderId: "400814777176",
    appId: "1:400814777176:web:74d4952acc9f0e76b97b2d",
    measurementId: "G-LR584S5PEB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc }
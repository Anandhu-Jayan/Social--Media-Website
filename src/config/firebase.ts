// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import {getFirestore } from 'firebase/firestore'
import {getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5_mhzg3rgDg7lfjtZRBJJj_gxM0-R1l4",
  authDomain: "react-website-ee6d0.firebaseapp.com",
  projectId: "react-website-ee6d0",
  storageBucket: "react-website-ee6d0.appspot.com",
  messagingSenderId: "784197263888",
  appId: "1:784197263888:web:f905e3cecaa251e230e095"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const provider=new GoogleAuthProvider();
export const db=getFirestore(app);
export const storage=getStorage(app);
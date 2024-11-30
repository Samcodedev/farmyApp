import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBRaaIriPUxSSNGEqGAPsBBtOM-HRUVfZs",
  authDomain: "farmyapp-4000a.firebaseapp.com",
  projectId: "farmyapp-4000a",
  storageBucket: "farmyapp-4000a.firebasestorage.app",
  messagingSenderId: "511082828998",
  appId: "1:511082828998:web:f95482e14460ad376db3c7",
  measurementId: "G-JQCZDNFZDX"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvide = new GoogleAuthProvider()
export const db = getFirestore(app)
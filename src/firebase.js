// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage"
import {getFirestore, collection, getDocs} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzeOb_5ZSIs82gPK-L_e_mV5JsYpBGL6o",
  authDomain: "jeager-blog.firebaseapp.com",
  projectId: "jeager-blog",
  storageBucket: "jeager-blog.appspot.com",
  messagingSenderId: "642708090629",
  appId: "1:642708090629:web:04b304750f50434591916c",
  measurementId: "G-5FJYBRHY2Q"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = getFirestore()
export const colRef = collection(db, 'Blogs')

export const storage = getStorage()
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZV3Mzv_4VCrikHSN7b86HiRIig12knJc",
  authDomain: "build-habits-7d059.firebaseapp.com",
  projectId: "build-habits-7d059",
  storageBucket: "build-habits-7d059.appspot.com",
  messagingSenderId: "579099527427",
  appId: "1:579099527427:web:8622f76141f04b1fadc136",
  measurementId: "G-GCGRFPH0M7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
